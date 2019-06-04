import * as React from "react";

import MapboxGlWraper from "./MapboxGL/MapboxGlWraper";
import CesiumMap from "./Cesium/CesiumMap.jsx";

import styleTool from "../../../utilities/style";

import { IDocument, MapRender } from '../../../utilities/map/document';

import './index.less';

interface IModelsProps {
  document: IDocument;
  dispatch: any;
  state: any;
  options: any;
  layout: any;
}

export default class MapRenderer extends React.Component<IModelsProps, {}> {

  render() {
    let document = this.props.document;
    //const layers = this.props.style.layers;
    //const selectedIndex = this.props.state.selectedLayerIndex;
    //const selectLayer = layers == undefined ? null : layers.length ? layers[selectedIndex] : null;

    let mapElement;

    const mapProps = {
      document: document,
      layout: this.props.layout,
      state: this.props.state,
      options: this.props.options,
      dispatch: this.props.dispatch,
    };

    const renderer = document.maprender;
    //console.log("MapRenderer", mapProps, renderer);

    // Check if OL code has been loaded?
    if (renderer === MapRender.Cesium) {
      mapElement = (<CesiumMap {...mapProps} />);
    } else {
      mapElement = (<MapboxGlWraper {...mapProps} />);
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
