import * as React from 'react';
import { Menu } from 'antd';
import IconFont from '../IconFont/mapgis';

const Item =Menu. Item;

const data = [
    {
        title: '缩放至',
        icon: "icon-zoom",
    },
    {
        title: '透明度',
        icon: "icon-transparency",
    },
    {
        title: '设置可见范围',
        icon: "icon-range",
    },
    {
        title: '重命名',
        icon: "icon-rename",
    },
];


interface IBackProps {

};

class BackContent extends React.Component<IBackProps, {}> {

    render() {
        return (
            <Menu >
                {data.map((item, index) => {
                    return (
                    <Item key={index}>
                        <IconFont type={item.icon}></IconFont>
                        <span>{item.title}</span>
                    </Item>);
                })}
            </Menu>
        );
    }
}

export default BackContent;
