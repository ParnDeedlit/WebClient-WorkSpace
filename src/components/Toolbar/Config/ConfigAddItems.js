import * as React from 'react';
import { Menu } from 'antd';
import IconFont from '../../IconFont/mapgis';
const Item =Menu. Item;

export function bindAddMenus(click) {
    return (
        <Menu onClick={click}>
            <Item key="search-layer">
            <IconFont type="icon-search" /> 
            <span >搜索图层</span>
            </Item>
            <Item key="add-web-layer">
            <IconFont type="icon-WEBqianduan" /> 
            <span >从Web添加图层</span>
            </Item>
            <Item key="add-local-layer">
            <IconFont type="icon-analysischart" /> 
            <span >从本地添加图层</span>
            </Item>
        </Menu>);
};

export let AddItems = {
    icon:"icon-add",
    command: "icon-add",
    text:"添加", 
    ui:"dropdown", 
    ui_content: null,
    options: {
    
    }
};

export default AddItems;