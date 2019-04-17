import * as React from "react";
export function getAttrInfo(map, layout) {
  return  <div />;
}

export function getEmptry(map, layout) {
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
  }
];

export default BottomTabs;
