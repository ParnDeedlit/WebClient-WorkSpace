import * as React from 'react';
import { Button } from 'antd';

export function bindAttrMenus(click, title) {
    return (
        <Button type="default" onClick={click} size="small">{title}</Button>
    );
}

export let AttrItem = {
    icon:"icon-attribute",
    command: null,
    text:"属性信息", 
    ui:"button", 
    ui_content: null,
    tooltip: "点击收缩/展开底部面板",
    onClick: null,
    options: {
    }
};

export default AttrItem;