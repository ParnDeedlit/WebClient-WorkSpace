import React from "react";
import PropTypes from "prop-types";

import {
  getLayers,
  getFonts,
  getVectorTileSource,
  getSpritePng
} from "./vectortile/MapgisVectorTileLayer";

import "cesium/Widgets/widgets.css";
import Cesium from "cesium/Cesium";

import ol from "ol";

import VectorTileProvider from "./vectortile/VectorTileProvider";
import VectorTileStyle from "./vectortile/MapgisVectorTileStyle";

import SpriteData from "./vectortile/spritedata";

export default class CesiumMap extends React.Component {
  static propTypes = {
    onDataChange: PropTypes.func,
    mapStyle: PropTypes.object,
    accessToken: PropTypes.string,
    style: PropTypes.object
  };

  static defaultProps = {
    onMapLoaded: () => {},
    onDataChange: () => {}
  };

  constructor(props) {
    super(props);

    var west = 120.47; //117.25;    //
    var south = 23.12; // 38.85;       //23.12
    var east = 121.31; //117.50;       //121.31
    var north = 23.58; //39.00;       //23.58

    var rectangle = Cesium.Rectangle.fromDegrees(west, south, east, north);

    Cesium.Camera.DEFAULT_VIEW_FACTOR = 0;
    Cesium.Camera.DEFAULT_VIEW_RECTANGLE = rectangle;

    this.vectortile = null;
    this.sources = null;
    console.log("Cesium constructor", this.props.mapStyle);
  }

  updateStyle(newMapStyle) {
    if (!this.map) return;

    this.layers = getLayers(newMapStyle);
    this.sources = getVectorTileSource(newMapStyle);
    this.spritepng = getSpritePng(newMapStyle);

    console.log("getlayers", this.layers);
    console.log("sources", this.sources);
    console.log("sprite", this.spritepng);

    this.style = VectorTileStyle(
      newMapStyle,
      this.layers,
      null,
      SpriteData,
      this.spritepng,
      getFonts
    );

    var self = this;

    setTimeout(function() {
      self.addVectorTile(self);
    }, 1000);
  }

  addVectorTile(self) {
    if (this.vectortile) {
      this.map.imageryLayers.remove(this.vectortile);
      this.vectortile = null;
    }
    if (this.vectortile == null && this.sources.length > 0) {
      var source = this.sources[0];
      this.vectortile = VectorTileProvider(Cesium, ol, {
        key:
          "pk.eyJ1IjoiYWhvY2V2YXIiLCJhIjoiRk1kMWZaSSJ9.E5BkluenyWQMsBLsuByrmg",
        url: source.tiles[0],
        style: this.style
      });
      this.map.imageryLayers.addImageryProvider(this.vectortile);
    }
  }

  componentDidUpdate() {
    //this.updateStyle(this.props.mapStyle);
    console.log("componentDidUpdate", this.props.mapStyle);
  }

  componentDidMount() {
    //Cesium.Ion.defaultAccessToken = 'your_access_token';
    var mapbox = new Cesium.MapboxImageryProvider({
      mapId: "mapbox.streets",
      accessToken:
        "pk.eyJ1IjoiYWhvY2V2YXIiLCJhIjoiRk1kMWZaSSJ9.E5BkluenyWQMsBLsuByrmg"
    });
    const map = new Cesium.Viewer("cesiumContainer", {
      imageryProvider: null, //mapbox,
      baseLayerPicker: true,
      terrainProvider: Cesium.createWorldTerrain({
        requestVertexNormals: true
      })
    });
    this.map = map;
    //this.updateStyle(this.props.mapStyle);
  }

  render() {
    return (
      <div
        className="cesiumContainer"
        id="cesiumContainer"
        ref={x => (this.container = x)}
      />
    );
  }
}
