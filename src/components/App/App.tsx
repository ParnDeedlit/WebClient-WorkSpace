import * as React from 'react';
import { connect } from 'dva';

import { Layout, Menu, Breadcrumb } from 'antd';

import appDefinition from '../App/appDefiniton'
import Workspace from '../Workspace/Workspace'

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
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">工作空间</Menu.Item>
            <Menu.Item key="2">文档</Menu.Item>
            <Menu.Item key="3">Github</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 0px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Workspace />
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>Content</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
   </Footer>
      </Layout>
    );
  };
}

function mapStateToProps(state: any, ownProps: any) {
  return {

  }
}

export default connect(mapStateToProps)(App);
