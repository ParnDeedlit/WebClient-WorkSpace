import * as React from "react";
import AttrPane from "../Pane/BottomPane/AttrPane";

export function getAttrInfo(document, map, layout) {
  return <AttrPane document={document} />;
}

export function getEmptry(document, map, layout) {
  return <div />;
}

export const BottomDefaultKey = "bottom-attr-info";

export const BottomTabs = [
  {
    title: "属性信息",
    icon: "icon-attribute",
    key: "bottom-attr-info",
    ui: getAttrInfo
  },
  {
    title: "图表统计",
    icon: "icon-chart",
    key: "bottom-chart-info",
    ui: getEmptry
  },
  {
    title: "性能分析",
    icon: "icon-performance",
    key: "bottom-chart-performance",
    ui: getEmptry
  }
];

export default BottomTabs;
