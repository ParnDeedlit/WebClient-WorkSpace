import * as React from "react";
import { Menu } from "antd";
import IconFont from "../../IconFont/mapgis";
const Item = Menu.Item;

export function bindAddMenus(click) {
  return (
    <Menu onClick={click}>
      <Item key="docment-import">
        <IconFont type="icon-daoru" />
        <span>打开地图文档</span>
      </Item>
      <Item key="document-export">
        <IconFont type="icon-daochu" />
        <span>保存地图文档</span>
      </Item>
      <Menu.Divider />
      <Item key="search-layer">
        <IconFont type="icon-search" />
        <span>搜索图层</span>
      </Item>
      <Item key="add-web-layer">
        <IconFont type="icon-WEBqianduan" />
        <span>从Web添加图层</span>
      </Item>
      <Item key="add-local-layer">
        <IconFont type="icon-analysischart" />
        <span>从本地添加图层</span>
      </Item>
      <Menu.Divider />
      <Item key="add-local-setting">
        <IconFont type="icon-quanjushezhi" />
        <span>设置</span>
      </Item>
    </Menu>
  );
}

export let AddItems = {
  icon: "icon-add",
  command: "icon-add",
  text: "常规",
  ui: "dropdown",
  ui_content: null,
  options: {}
};

export default AddItems;
