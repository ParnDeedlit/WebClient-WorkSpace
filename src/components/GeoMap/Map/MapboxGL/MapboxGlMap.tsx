import * as React from "react";
import * as ReactDOM from "react-dom";
import * as MapboxGl from "mapbox-gl";
import * as MapboxInspect from "mapbox-gl-inspect";

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
  mapStyle: Object; //isRequired,
  options: any;
  layout: any;
  dispatch?: any;
}

interface IMapboxGlMapStates {
  map: any;
  backgrounds: Array<BackGround>;
  isLoad: boolean;
}

export default class MapboxGlMap extends React.Component<
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
    var self = this;
    if (!IS_SUPPORTED) return;

    if (!this.state.map) return;

    const metadata = props.mapStyle.metadata || {};
    MapboxGl.accessToken =
      metadata["mapgis:mapbox_access_token"] || tokens.mapbox;

    var style = this.updateStyle();
    this.state.map.setStyle(style, { diff: true });

    //this.state.map.remove();     
    this.updateBackgroud();
    this.state.map.on("style.load", () => {
      this.updateBackgroud();
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    let should = false;
    should =
      JSON.stringify(this.props.layout) !==
      JSON.stringify(nextProps.layout);

    if (should) {
      if (this.state.map) this.state.map.resize();
      return false;
    }

    try {
      should =
        JSON.stringify(this.props) !==
        JSON.stringify(nextProps);
    } catch (e) { }
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
      console.log("load!!")
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
      console.log("zoom", e, level);
      this.zoom(level);
    });

  }

  render() {
    if (IS_SUPPORTED) {
      return (
        <div className="workspace-layout-map-wraper-mapboxgl" ref={x => (this.container = x)} />
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
