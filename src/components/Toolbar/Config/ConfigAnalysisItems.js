import * as React from 'react';
import { Menu } from 'antd';
const Item =Menu. Item;

export function bindAnalysisMenus(click) {
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

export let AnalysisItems = {
    icon:"icon--analysis",
    command: "icon--analysis",
    text:"空间分析", 
    ui:"dropdown", 
    ui_content: null,
    options: {
    
    }
};

export default AnalysisItems;