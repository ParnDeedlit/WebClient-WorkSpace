import * as React from "react";
import * as ReactDOM from "react-dom";
import * as MapboxGL from "mapbox-gl";
import * as MapboxInspect from "mapbox-gl-inspect";

import { MapContext } from './Global/context';

import tokens from "../../../../config/tokens";

import { layouts, clearLayout, addLayout } from "../Common/geopdf/layout";
import { printCanvas } from "../Common/png/printCanvas";

import { FPSControl } from "../Common/unit";

import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "mapbox-gl/dist/mapbox-gl.css";

import { IDocument } from '../../../../utilities/map/document';
import { MapMouseEvent, Positon, toggleMousePosition, toggleZoomLevel } from '../../../../utilities/map';
import { LayerType } from '../../../../utilities/map/layer';
import { BackGroundLayer } from '../../../../utilities/map/background';

const IS_SUPPORTED = MapboxGL.supported();

var self = null;

interface IMapboxGlMapProps {
  document: IDocument;
  options: any;
  layout: any;
  dispatch?: any;
  onStyleLoad?: Function;
  children?: JSX.Element | JSX.Element[] | Array<JSX.Element | undefined>;
}

interface IMapboxGlMapStates {
  map: MapboxGL.Map;
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
  };

  private container = null;
  private drawTool = null;

  constructor(props) {
    super(props);
    self = this;
    MapboxGL.accessToken = tokens.mapbox;
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

  getFirstLayer(layers) {
    if (!layers) return "";
    if (layers.length <= 0) return "";

    var backgrounds = layers.filter(layer => {
      return layer.type === 'background';
    });
    if (backgrounds && backgrounds.length > 0) {
      //有背景图层存在,返回最后一个背景图层id
      return backgrounds[backgrounds.length - 1];
    }
    var rastertiles = layers.filter(layer => {
      return layer.type === 'rastertile';
    });
    if (rastertiles && rastertiles.length > 0) {
      //有栅格图层存在,返回第一个栅格图层id
      return rastertiles[rastertiles.length - 1];
    }
    return layers[0];
  }

  public componentWillReceiveProps(nextProps) {
    const { map } = this.state;
    if (!map) {
      return null;
    }
    return null;
  }

  componentDidMount() {
    //console.log("mapbox componentDidMount");
    if (!IS_SUPPORTED) return;

    const { onStyleLoad } = this.props;

    const style = this.updateStyle();
    const { current, backgrounds, layers } = this.props.document;

    const mapOpts = {
      ...this.props.options,
      container: this.container,
      style: style,//this.props.mapStyle,
      //hash: true,
      //preserveDrawingBuffer: true //特别注意，打印的时候必须启动该配置项
    };

    const map = new MapboxGL.Map(mapOpts);

    map.showTileBoundaries = mapOpts.showTileBoundaries;
    map.showCollisionBoxes = mapOpts.showCollisionBoxes;
    map.showOverdrawInspector = mapOpts.showOverdrawInspector;

    const nav = new MapboxGL.NavigationControl();
    map.addControl(nav, "top-right");

    var fpsControl = new FPSControl();
    map.addControl(fpsControl, "top-right");

    map.on("load", (e, target) => {
      this.setState({ map: map, isLoad: true });
      if (onStyleLoad) {
        var beforeId = this.getFirstLayer(map.getStyle().layers);
        var option = { before: beforeId };
        onStyleLoad(e, target, option);
      }
    });

    map.on("mousemove", (e) => {
      this.currentPosition([e.lngLat.lng, e.lngLat.lat]);
    });

    map.on("zoomend", (e) => {
      let level = e.target.style.z;
      this.zoom(level);
    });

  }

  public setRef = (x: HTMLElement | null) => {
    this.container = x!;
  };

  render() {
    const { children } = this.props;
    const { isLoad, map } = this.state;

    //console.log("mapboxgl map render", children);

    if (IS_SUPPORTED) {
      return (
        <MapContext.Provider value={map}>
          <div
            ref={this.setRef}
            className="workspace-layout-map-wraper-mapboxgl"
          >
            {isLoad && children}
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