import * as React from "react";
import { connect } from 'dva';

import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

import Models from '../Model/Models'

import { toggleProject, toggleTransform } from '../../action/command/project';

interface IProps {
    content: any,
    dispatch: any,
    commandproject: any,
}

interface IState {
    id: number,
    toggleTransform: boolean,
    toggleProject: boolean,
    current: string,
}

class ToolbarManager extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props)
        this.state = {
            id: 1,
            toggleTransform: false,
            toggleProject: false,
            current: 'mail',
        }
    }

    private defaultState = {
        id: 1,
        toggleTransform: false,
        toggleProject: false,
        current: 'mail',
    }

    handleClick = (e) => {
        this.setState({
            current: e.key,
        });
        switch (e.key) {
            case "projection":
                this.toggleProject();
                break;
            case "transform":
                this.toggleTransform();
                break
        }
    }

    public render(): JSX.Element {
        const toggleProject = this.props.commandproject.toggleProject;
        const toggleTransform = this.props.commandproject.toggleTransform;
        return (
            <div>
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                >
                    <SubMenu title={<span className="submenu-title-wrapper"><Icon type="poweroff" />开始</span>}>
                        <Menu.Item key="folder-add"><Icon type="folder-add" />新建</Menu.Item>                        
                        <Menu.Item key="folder-open"><Icon type="folder-open" />打开</Menu.Item>
                        <Menu.Item key="folder"><Icon type="folder" />保存</Menu.Item>
                        <Menu.Item key="share-alt"><Icon type="share-alt" />共享</Menu.Item>
                    </SubMenu>
                    <SubMenu title={<span className="submenu-title-wrapper"><Icon type="global" />投影变换</span>}>
                        <MenuItemGroup title="投影解释">
                            <Menu.Item key="projection">交互投影解释</Menu.Item>
                        </MenuItemGroup>
                        <MenuItemGroup title="投影变换">
                            <Menu.Item key="transform">单点投影变换</Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                    <Menu.Item key="alipay">
                        <span><Icon type="gold" />空间分析</span>
                    </Menu.Item>
                </Menu>
                <Models
                    toggleProject={toggleProject}
                    toggleTransform={toggleTransform}
                ></Models>
            </div>
        );
    }

    private toggleProject = () => { this.props.dispatch(toggleProject(true)) }
    private toggleTransform = () => { this.props.dispatch(toggleTransform(true)) }

}

function mapStateToProps(state: any, ownProps: any) {
    return {
        ...state
    }
}

export default connect(mapStateToProps)(ToolbarManager);
