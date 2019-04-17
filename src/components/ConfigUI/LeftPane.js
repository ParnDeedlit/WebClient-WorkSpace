import * as React from "react";
import Document from "../GeoMap/Document/Document";

export function getDocument(map, layout) {
  return <Document document={map.document} />;
}

export function getEmptry(map, layout) {
  return <div />;
}

export const LeftDefaultKey = "left-document-tree";

export const LeftTabs = [
  {
    title: "地图文档",
    icon: "icon-map",
    key: "left-document-tree",
    ui: getDocument
  },
  {
    title: "图例",
    icon: "icon-briefInfosprite",
    key: "left-sprite-info",
    ui: getEmptry
  },
  {
    title: "图形",
    icon: "icon-Geometry",
    key: "left-geometry-info",
    ui: getEmptry
  },
  {
    title: "其他",
    icon: "icon-other",
    key: "left-other-info",
    ui: getEmptry
  }
];

export default LeftTabs;
