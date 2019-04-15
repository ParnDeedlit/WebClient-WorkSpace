import * as React from "react";
import * as ReactDOM from "react-dom";
import * as MapboxGl from "mapbox-gl";
import * as MapboxInspect from "mapbox-gl-inspect";
import FeatureLayerPopup from "./FeatureLayerPopup";
//import FeaturePropertyPopup from './FeaturePropertyPopup';
import tokens from "../../../../config/tokens";
import colors from "mapbox-gl-inspect/lib/colors";
import Color from "color";
import ZoomControl from "./ZoomControl";
//import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { colorHighlightedLayer } from "../../../../utilities/highlight";

import { layouts, clearLayout, addLayout } from "../Common/geopdf/layout";
import { printCanvas } from "../Common/png/printCanvas";

import { FPSControl } from "../Common/unit";

import bbox from "@turf/bbox";

import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "mapbox-gl/dist/mapbox-gl.css";
//import '../../mapboxgl.css';
//import "../../../../utilities/mapbox-rtl";

const IS_SUPPORTED = MapboxGl.supported();

function renderPropertyPopup(features) {
  /*   var mountNode = document.createElement('div');
  ReactDOM.render(<FeaturePropertyPopup features={features} />, mountNode)
  return mountNode.innerHTML; */
}

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
  /*   geometry: Object,
  printOption:Object, */
  onDataChange: Function;
  onLayerSelect: Function; //isRequired
  /* onMapRect: Function, */
  mapStyle: Object; //isRequired,
  inspectModeEnabled: boolean; //isRequired,
  highlightedLayer: Object;
  options: any;
  layout: any;
}

interface IMapboxGlMapStates {
  map: any;
  inspect: any;
  isPopupOpen: boolean;
  popupX: number;
  popupY: number;
  geomIndex: number;
  isLoad: boolean;
  printFlag: boolean;
  printRect: any;
  printId: number;
}

export default class MapboxGlMap extends React.Component<
  IMapboxGlMapProps,
  IMapboxGlMapStates
> {
  static defaultProps = {
    onMapLoaded: () => {},
    onDataChange: () => {},
    onLayerSelect: () => {},
    mapboxAccessToken: tokens.mapbox,
    options: {}
  };

  public state: IMapboxGlMapStates = {
    map: null,
    inspect: null,
    isPopupOpen: false,
    popupX: 0,
    popupY: 0,
    geomIndex: 0,
    isLoad: false,
    printFlag: false,
    printRect: null,
    printId: -1
  };

  private container = null;
  private drawTool = null;

  constructor(props) {
    super(props);
    self = this;
    MapboxGl.accessToken = tokens.mapbox;
  }

  updateMapFromProps(props) {
    var self = this;
    if (!IS_SUPPORTED) return;

    if (!this.state.map) return;

    this.state.map.resize();    

    const metadata = props.mapStyle.metadata || {};
    MapboxGl.accessToken =
      metadata["maputnik:mapbox_access_token"] || tokens.mapbox;

    if (!props.inspectModeEnabled) {
      //Mapbox GL now does diffing natively so we don't need to calculate
      //the necessary operations ourselves!
      var style = props.mapStyle;
      //style.sources.GeoJSON.data = props.geometry;
      this.state.map.setStyle(props.mapStyle, { diff: true });
      //this.updateGeometry(self);
    }

    /* if (this.state.printFlag) {
      if (this.props.printOption.mode == "RECT_PRINT") {
        if (this.state.printId != this.props.printOption.id) {
          this.updatePrint();
          this.state.printId = this.props.printOption.id;
        }
      }
    } */
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

    if (this.props.inspectModeEnabled !== prevProps.inspectModeEnabled) {
      this.state.inspect.toggleInspector();
    }
    if (this.props.inspectModeEnabled) {
      this.state.inspect.render();
    }

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

    const inspect = new MapboxInspect({
      popup: new MapboxGl.Popup({
        closeOnClick: false
      }),
      showMapPopup: true,
      showMapPopupOnHover: false,
      showInspectMapPopupOnHover: true,
      showInspectButton: false,
      blockHoverPopupOnClick: false,
      assignLayerColor: (layerId, alpha) => {
        return Color(colors.brightColor(layerId, alpha))
          .desaturate(0.5)
          .string();
      },
      buildInspectStyle: (originalMapStyle, coloredLayers) =>
        buildInspectStyle(
          originalMapStyle,
          coloredLayers,
          this.props.highlightedLayer
        ),
      /* renderPopup: features => {
        if (this.props.inspectModeEnabled) {
          return renderPropertyPopup(features);
        } else {
          var mountNode = document.createElement("div");
          ReactDOM.render(
            <FeatureLayerPopup
              features={features}
              onLayerSelect={this.props.onLayerSelect}
            />,
            mountNode
          );
          return mountNode;
        }
      } */
    });

    /* this.drawTool = new MapboxDraw();

    map.addControl(this.drawTool, "top-right");
 */

    //map.addControl(inspect);

    map.on("style.load", () => {
      this.setState({ map, inspect });
      this.setState({ isLoad: true });
    });

    //map.on('draw.create', this.updateCanvas);

    map.on("data", e => {
      if (e.dataType !== "tile") return;
      this.props.onDataChange({
        map: this.state.map
      });
    });
  }

  render() {
    if (IS_SUPPORTED) {
      return (
        <div className="workspace-layout-map-wraper-mapboxgl" ref={x => (this.container = x)}/>
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
