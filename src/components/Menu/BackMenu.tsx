import * as React from 'react';
import { Dropdown, Menu } from 'antd';
import IconFont from '../IconFont/mapgis';
import BackMenuItems from './BackMenuItems';

interface IBackProps {
    title: string;
};

class BackMenu extends React.Component<IBackProps, {}> {

    getMenu() {
        return (<BackMenuItems />);
    }

    render() {
        const menu = this.getMenu();
        return (
            <Dropdown overlay={menu} trigger={["hover", "click"]}>
                <IconFont type="icon-moreread"></IconFont>
            </Dropdown>
        );
    }
}

export default BackMenu;
