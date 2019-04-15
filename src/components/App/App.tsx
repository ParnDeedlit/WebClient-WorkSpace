import * as React from 'react';
import { connect } from 'dva';

import { Layout, Menu, Breadcrumb } from 'antd';

import appDefinition from '../App/appDefiniton'
//import Workspace from '../Workspace/WorkSpace'
import WorkspaceAntd from '../Workspace/WorkSpaceAntd'

const { Header, Content, Footer } = Layout;

import './App.scss';

class App extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);

    this.state = {
      isMenuVisible: false
    };
  }

  public render(): JSX.Element {
    return (
      <Layout className="layout">
        <Header className="header">
          <div className="logo">Map<span>GIS</span></div>
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '62px' }}
          >
            <Menu.Item key="1">我的地图</Menu.Item>
            <Menu.Item key="2">文档</Menu.Item>
            <Menu.Item key="3">Github</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 0px' }}>
          <WorkspaceAntd />
        </Content>
      </Layout>
    );
  };
}

function mapStateToProps(state: any, ownProps: any) {
  return {

  }
}

export default connect(mapStateToProps)(App);
