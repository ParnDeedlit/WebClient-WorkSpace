import * as React from 'react';
import { Button } from 'antd';

export function bindDocumentMenus(click, title) {
    return (
        <Button type="default" onClick={click} size="small">{title}</Button>
    );
}

export let DocumentItem = {
    icon:"icon-documentation",
    command: null,
    text:"详细信息", 
    ui:"button", 
    ui_content: null,
    tooltip: "点击收缩/展开面板",
    onClick: null,
    options: {
    }
};

export default DocumentItem;