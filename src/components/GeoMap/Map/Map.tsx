import * as React from "react";

import MapboxGlMap from "./MapboxGL/MapboxGlMap";

import styleTool from "../../../utilities/style";

import {IDocument} from '../../../utilities/document';

interface IModelsProps {
  document: IDocument;
  dispatch: any;
  style: any;
  state: any;
  options: any;
  layout: any;
}

export default class MapRenderer extends React.Component<IModelsProps, {}> {
  render() {
    //const layers = this.props.style.layers;
    //const selectedIndex = this.props.state.selectedLayerIndex;
    //const selectLayer = layers == undefined ? null : layers.length ? layers[selectedIndex] : null;
    const mapProps = {
      mapStyle: styleTool.replaceAccessTokens(this.props.style, {
        allowFallback: true
      }),
      document: this.props.document,
      layout: this.props.layout,
      options: this.props.options,
      dispatch: this.props.dispatch,
    };
    //console.log("MapRenderer", mapProps);

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
      <div className="workspace-layout-map-wraper">
        {mapElement}
      </div>
    );
  }
}
