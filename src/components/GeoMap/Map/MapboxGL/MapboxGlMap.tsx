import * as React from "react";
import * as ReactDOM from "react-dom";
import * as MapboxGl from "mapbox-gl";
import * as MapboxInspect from "mapbox-gl-inspect";

import tokens from "../../../../config/tokens";
import colors from "mapbox-gl-inspect/lib/colors";
import Color from "color";
import ZoomControl from "./ZoomControl";

import { colorHighlightedLayer } from "../../../../utilities/highlight";

import { layouts, clearLayout, addLayout } from "../Common/geopdf/layout";
import { printCanvas } from "../Common/png/printCanvas";

import { FPSControl } from "../Common/unit";

import bbox from "@turf/bbox";

import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "mapbox-gl/dist/mapbox-gl.css";
import Document from '../../Document/Document';
//import '../../mapboxgl.css';
//import "../../../../utilities/mapbox-rtl";

const IS_SUPPORTED = MapboxGl.supported();


function buildInspectStyle(originalMapStyle, coloredLayers, highlightedLayer) {
  const backgroundLayer = {
    id: "background",
    type: "background",
    paint: {
      "background-color": "#1c1f24"
    }
  };

  const layer = colorHighlightedLayer(highlightedLayer);
  if (layer) {
    coloredLayers.push(layer);
  }

  const sources = {};
  Object.keys(originalMapStyle.sources).forEach(sourceId => {
    const source = originalMapStyle.sources[sourceId];
    if (source.type !== "raster" && source.type !== "raster-dem") {
      sources[sourceId] = source;
    }
  });

  const inspectStyle = {
    ...originalMapStyle,
    sources: sources,
    layers: [backgroundLayer].concat(coloredLayers)
  };
  return inspectStyle;
}

var self = null;

interface IMapboxGlMapProps {
  document: string;
  mapStyle: Object; //isRequired,
  options: any;
}

interface IMapboxGlMapStates {
  map: any;
  isLoad: boolean;
}

export default class MapboxGlMap extends React.Component<
  IMapboxGlMapProps,
  IMapboxGlMapStates
  > {
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
    MapboxGl.accessToken = tokens.mapbox;
  }

  updateBackgroud(){
    const document = self.props.document;
    const background = document.background;
    const {id, tileUrl} = background;
    if(!id || !tileUrl) return;

    self.state.map.addLayer({
      "id": id,
      "type": "raster",
      //连接图层来源
      "source":  {
          "type": "raster",
          "tiles": [ tileUrl ],
          "minZoom": 0,
          "maxZoom": 20
      },
      "minzoom": 0,
      "maxzoom": 22
    });
  }

  updateMapFromProps(props) {
    var self = this;
    if (!IS_SUPPORTED) return;

    if (!this.state.map) return;

    this.state.map.resize();

    const metadata = props.mapStyle.metadata || {};
    MapboxGl.accessToken =
      metadata["mapgis:mapbox_access_token"] || tokens.mapbox;

    var style = props.mapStyle;
    this.state.map.setStyle(props.mapStyle, { diff: true });
          
    this.updateBackgroud();
  }

  shouldComponentUpdate(nextProps, nextState) {
    let should = false;
    try {
      should =
        JSON.stringify(this.props) !==
        JSON.stringify(
          nextProps
        ); /* || JSON.stringify(this.state) !== JSON.stringify(nextState); */
    } catch (e) {
      // no biggie, carry on
    }
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

    const mapOpts = {
      ...this.props.options,
      container: this.container,
      style: this.props.mapStyle,
      //hash: true,
      preserveDrawingBuffer: true //特别注意，打印的时候必须启动该配置项
    };

    const map = new MapboxGl.Map(mapOpts);

    map.showTileBoundaries = mapOpts.showTileBoundaries;
    map.showCollisionBoxes = mapOpts.showCollisionBoxes;
    map.showOverdrawInspector = mapOpts.showOverdrawInspector;

    const zoom = new ZoomControl();
    map.addControl(zoom, "top-right");

    const nav = new MapboxGl.NavigationControl();
    map.addControl(nav, "top-right");

    var fpsControl = new FPSControl();
    map.addControl(fpsControl, "top-right");

    map.on("style.load", () => {
      this.setState({ map });
      this.setState({ isLoad: true });
      this.updateBackgroud();
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
