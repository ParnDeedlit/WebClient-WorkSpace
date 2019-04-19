import * as React from 'react';
import { Menu, Tag, Divider, Icon } from 'antd';
import IconText from '../IconFont/IconText';

const Item = Menu.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const data = [
    {
        title: '缩放',
        icon: "icon-zoom",
        key: "zoom",
    },
    {
        title: '透明度',
        icon: "icon-transparency",
        key: "opticty",
    },
    {
        title: '设置可见范围',
        icon: "icon-range",
        key: "range",
    },
    {
        title: '重命名',
        icon: "icon-rename",
        key: "rename",
    },
];


interface IBackProps {

};


class BackContent extends React.Component<IBackProps, {}> {

    getMenuItem(item) {
        return (<Item key={item.key}>
            <IconText type={item.icon} text={item.title}  />
        </Item>)
    }

    getSubMenu(data) {
        return data.map((item) => {
            return this.getMenuItem(item);
            /* return (<SubMenu
                title={<IconText type={item.icon} text={item.title} />}
            >
                {this.getMenuItem(item)}
            </SubMenu>) */
        });
    }

    render() {
        const submenu = this.getSubMenu(data);
        return (
            <Menu>
                { submenu }
            </Menu>
        );
    }
}

export default BackContent;
