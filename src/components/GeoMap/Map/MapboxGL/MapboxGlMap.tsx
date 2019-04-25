import * as React from "react";
import * as ReactDOM from "react-dom";
import * as MapboxGl from "mapbox-gl";
import * as MapboxInspect from "mapbox-gl-inspect";

import { MapContext } from './Global/context';

import tokens from "../../../../config/tokens";

import { layouts, clearLayout, addLayout } from "../Common/geopdf/layout";
import { printCanvas } from "../Common/png/printCanvas";

import { FPSControl } from "../Common/unit";

import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "mapbox-gl/dist/mapbox-gl.css";

import { IDocument } from '../../../../utilities/document';
import { MapMouseEvent, Positon, toggleMousePosition, toggleZoomLevel } from '../../../../utilities/map';
import { LayerType, BackGround } from '../../../../utilities/layer';

const IS_SUPPORTED = MapboxGl.supported();

var self = null;

interface IMapboxGlMapProps {
  document: IDocument;
  options: any;
  layout: any;
  dispatch?: any;
  children?: JSX.Element | JSX.Element[] | Array<JSX.Element | undefined>;
}

interface IMapboxGlMapStates {
  map: any;
  backgrounds: Array<BackGround>;
  isLoad: boolean;
}

export class MapboxGlMap extends React.Component<
  IMapboxGlMapProps,
  IMapboxGlMapStates
  > implements MapMouseEvent {

  zoom(zoom: number): number {
    this.props.dispatch(toggleZoomLevel(zoom));
    return zoom;
  }

  currentPosition(point: Positon): Positon {
    //throw new Error("Method not implemented.");
    let position: Positon = [0, 0];
    if (!point) return position;
    this.props.dispatch(toggleMousePosition(point));
    return point;
  }

  click(event: any) {
    //throw new Error("Method not implemented.");
  }

  static defaultProps = {
    mapboxAccessToken: tokens.mapbox,
    options: {}
  };

  public state: IMapboxGlMapStates = {
    map: null,
    isLoad: false,
    backgrounds: []
  };

  private container = null;
  private drawTool = null;

  constructor(props) {
    super(props);
    self = this;
    MapboxGl.accessToken = tokens.mapbox;
  }

  updateBackgroud() {
    let map = self.state.map;
    const document = self.props.document;
    let backgrounds = this.state.backgrounds;

    if (!map) return;

    backgrounds.forEach(background => {
      const { id, tileUrl } = background;
      if (!id || !tileUrl) return;
      var current = map.getLayer(background.id);
      if (current && current.id) {
        //map.removeSource(current.id);
        map.removeLayer(current.id);
      }
    });

    backgrounds = document.backgrounds;
    this.setState({ backgrounds: backgrounds });

    backgrounds.forEach(background => {
      const { id, tileUrl } = background;
      if (!id || !tileUrl) return;

      if (map.getLayer(id)) {
        map.removeLayer(id);
      }
      if (map.getSource(id)) {
        map.removeSource(id);
      }
      map.addSource(id, {
        "type": "raster",
        "tiles": [tileUrl],
        "minZoom": 0,
        "maxZoom": 20
      });
      map.addLayer({
        "id": id,
        "type": "raster",
        "source": id,
        "minzoom": 0,
        "maxzoom": 20
      }, "background");
    });
  }

  updateStyle() {
    const document = self.props.document;
    const layers = document.layers;
    var style = null;

    for (var i = 0; i < layers.length; i++) {
      var layer = layers[i];
      if (layer.type == LayerType.VectorTile) {
        style = layer.mapstyle;
        return style;
      }
    }

  }

  updateMapFromProps(props) {
    if (!IS_SUPPORTED) return;

    if (!this.state.map) return;

    MapboxGl.accessToken = tokens.mapbox;

    var style = this.updateStyle();
    this.state.map.setStyle(style, { diff: false });

    this.state.map.on("style.load", () => {
      this.updateBackgroud();
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    let should = false;
    should = JSON.stringify(this.props.layout) !== JSON.stringify(nextProps.layout);

    if (should) {
      if (this.state.map) this.state.map.resize();
      return false;
    }

    const oldDocument = this.props.document;
    const newDocument = nextProps.document;
    const { layers, backgrounds } = oldDocument;
    const newLayers = newDocument.layers;
    const newBackgrounds = newDocument.backgrounds;

    try {
      should = JSON.stringify(layers) !== JSON.stringify(newLayers)
        || JSON.stringify(backgrounds) !== JSON.stringify(newBackgrounds);
    } catch (e) { }

    if (should) console.log("shouldComponentUpdate", backgrounds, newBackgrounds)
    return should;
  }

  componentDidUpdate(prevProps) {
    if (!IS_SUPPORTED) return;

    const map = this.state.map;
    const self = this;

    this.updateMapFromProps(this.props);

    if (map) {
      map.showTileBoundaries = this.props.options.showTileBoundaries;
      map.showCollisionBoxes = this.props.options.showCollisionBoxes;
      map.showOverdrawInspector = this.props.options.showOverdrawInspector;
    }
  }

  componentDidMount() {
    if (!IS_SUPPORTED) return;

    const style = this.updateStyle();
    const { current, backgrounds, layers } = this.props.document;
    //let iDocument = new IDocument(current, backgrounds, layers);

    const mapOpts = {
      ...this.props.options,
      container: this.container,
      style: style,//this.props.mapStyle,
      //hash: true,
      preserveDrawingBuffer: true //特别注意，打印的时候必须启动该配置项
    };

    const map = new MapboxGl.Map(mapOpts);

    map.showTileBoundaries = mapOpts.showTileBoundaries;
    map.showCollisionBoxes = mapOpts.showCollisionBoxes;
    map.showOverdrawInspector = mapOpts.showOverdrawInspector;

    const nav = new MapboxGl.NavigationControl();
    map.addControl(nav, "top-right");

    var fpsControl = new FPSControl();
    map.addControl(fpsControl, "top-right");

    map.on("load", () => {
      this.setState({ map });
      this.setState({ isLoad: true });
      this.setState({ backgrounds: backgrounds });
      this.updateBackgroud();
    });

    /* map.on("styledata", (e) => {
      console.log("styledata!!", e)
    });

    map.on("data", (e) => {
      console.log("data!!", e)
    });
 */
    map.on("mousemove", (e) => {
      this.currentPosition([e.lngLat.lng, e.lngLat.lat]);
    });

    map.on("zoomend", (e) => {
      let level = e.target.style.z;
      //console.log("zoom", e, level);
      this.zoom(level);
    });

  }

  render() {
    const { children } = this.props;
    if (IS_SUPPORTED) {
      return (
        <MapContext.Provider value={this.state.map}>
          <div
            ref={x => (this.container = x)}
            className="workspace-layout-map-wraper-mapboxgl"
          >
            {children}
          </div>
        </MapContext.Provider>
      );
    } else {
      return (
        <div className="workspace-layout-map-wraper-mapboxgl-error">
          <div className="workspace-layout-map-wraper-mapboxgl-error-message">
            Error: Cannot load MapboxGL, WebGL is either unsupported or disabled
          </div>
        </div>
      );
    }
  }
}

export default MapboxGlMap; 