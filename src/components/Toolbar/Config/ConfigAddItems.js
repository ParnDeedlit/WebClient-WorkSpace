import * as React from 'react';
import { Menu } from 'antd';
const Item =Menu. Item;

export function bindAddMenus(click) {
    return (
        <Menu onClick={click}>
            <Item key="projection">
            <span >搜索图层</span>
            </Item>
            <Item key="transform">
            <span >从Web添加图层</span>
            </Item>
            <Item key="transform">
            <span >从本地添加图层</span>
            </Item>
        </Menu>);
};

export let AddItems = {
    icon:"icon-open",
    command: "icon-open",
    text:"添加", 
    ui:"dropdown", 
    ui_content: null,
    options: {
    
    }
};

export default AddItems;