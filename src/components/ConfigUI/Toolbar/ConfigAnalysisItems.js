import * as React from 'react';
import { Menu } from 'antd';
import IconFont from '../../IconFont/mapgis';

const Item =Menu.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export function bindAnalysisMenus(click) {
    return (
        <Menu onClick={click}>
         <SubMenu title={<span><IconFont type="icon-global_warming" />投影变换</span>}>
           <Item key="projection">
            <IconFont type="icon-global_warming" /> 
            <span >投影解释</span>
            </Item>
            <Item key="transform">
            <IconFont type="icon-global" /> 
            <span >点单投影变换</span>
            </Item>
            <Item key="transform1">
            <IconFont type="icon-anquanbang_global_" /> 
            <span >批量投影变换</span>
            </Item>
           </SubMenu>
        <SubMenu title={<span><IconFont type="icon--analysis" />空间分析</span>}>
           <Item key="overlay">
            <IconFont type="icon-socialbufferoutline" /> 
            <span >叠加分析</span>
            </Item>
            <Item key="clip">
            <IconFont type="icon-clip-editing-montage" /> 
            <span >裁剪分析</span>
            </Item>
            <Item key="topology">
            <IconFont type="icon-anquanbang_global_" /> 
            <span >拓扑分析</span>
            </Item>
        </SubMenu>
       </Menu>
    );
};

export let AnalysisItems = {
    icon:"icon-analysis",
    command: "icon-analysis",
    text:"空间分析", 
    ui:"dropdown", 
    ui_content: null,
    options: {
    
    }
};

export default AnalysisItems;