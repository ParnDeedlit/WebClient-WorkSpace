import * as React from "react";
import BackgroudStyleView from "../Style/BackgroundStyle";
import StyleLayer from '../Pane/RightPane/StyleLayer';

export const RightDefaultKey = "right-layer-attr";

export function getStyleLayer(document) {
  return <StyleLayer document={document}/>;
}

export function getEmptry(document, map, layout) {
  return <div />;
}

export const RightTabs = [
/*   {
    title: "数据源",
    icon: "icon-map",
    key: "right-source-attr",
    ui: getEmptry
  }, */
  {
    title: "图层属性",
    icon: "icon-bianjibiaoge",
    key: "right-layer-attr",
    ui: getStyleLayer
  },
  {
    title: "图元属性",
    icon: "icon-map",
    key: "right-geometry-attr",
    ui: getEmptry
  },
  {
    title: "工具箱",
    icon: "icon-map",
    key: "right-toolbar-attr",
    ui: getEmptry
  }
];

export default RightTabs;
