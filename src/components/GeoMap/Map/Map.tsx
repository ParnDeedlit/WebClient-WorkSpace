import * as React from "react";

import MapboxGlMap from "./MapboxGL/MapboxGlMap";

import styleTool from "../../../utilities/style";

interface IModelsProps {
  style: any;
  state: any;
  options: any;
  layout: any;
}

export default class MapRenderer extends React.Component<IModelsProps, {}> {
  render() {
    const layers = this.props.style.layers;
    const selectedIndex = this.props.state.selectedLayerIndex;
    const selectLayer = layers == undefined ? null : layers.length ? layers[selectedIndex] : null;
    const mapProps = {
      mapStyle: styleTool.replaceAccessTokens(this.props.style, {
        allowFallback: true
      }),
      options: this.props.options,
      onDataChange: e => {
        /* this.layerWatcher.analyzeMap(e.map);
        this.fetchSources(); */
      },
      onLayerSelect: e => {
        /* this.layerWatcher.analyzeMap(e.map);
        this.fetchSources(); */
      },
      highlightedLayer: selectLayer,
      layout: this.props.layout,
    };
    console.log("MapRenderer", mapProps);

    const metadata = this.props.style.metadata || {};
    const renderer = metadata["maputnik:renderer"] || "mbgljs";

    let mapElement;

    // Check if OL code has been loaded?
    if (renderer === "ol") {
      //mapElement = <OpenLayersMap {...mapProps} />;
    } else if (renderer === "cesium") {
      //mapElement = <CesiumMap {...mapProps} />;
    } else {
/*       mapElement = (
        <div></div>
      ); */
      mapElement = (
        <MapboxGlMap
          {...mapProps}
          inspectModeEnabled={this.props.state === "inspect"}
          //onLayerSelect={this.onLayerSelect}
          //onMapRect={this.onMapRect}
        />
      );
    }

    /* let filterName;
    if (this.props.state.match(/^filter-/)) {
      filterName = this.props.state.replace(/^filter-/, "");
    }
    const elementStyle = { filter: null };
    if (filterName) {
      elementStyle.filter = `url('#${filterName}')`;
    }
 */
    return (
      <div /* style={elementStyle} */ className="workspace-layout-map-wraper">
        {mapElement}
      </div>
    );
  }
}
