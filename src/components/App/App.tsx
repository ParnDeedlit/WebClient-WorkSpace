import * as React from 'react';
import { connect } from 'dva';

import { Layout, Menu, Breadcrumb } from 'antd';

import appDefinition from '../App/appDefiniton'
//import Workspace from '../Workspace/WorkSpace'
import WorkspaceAntd from '../Workspace/WorkSpaceAntd'

const { Header, Content, Footer } = Layout;

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './App.scss';

class App extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);

    this.state = {
      isMenuVisible: false
    };
  }

  public getWorkSpace(){
    return <WorkspaceAntd />;
  }

  public getStudio(){
    return <div />;
  }

  public render(): JSX.Element {

    return (
      <Router>
        <Layout className="layout">
          <Header className="header">
            <div className="logo">Map<span>GIS</span></div>
            <Menu
              theme="light"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{ lineHeight: '62px' }}
            >
              <Menu.Item key="1">我的地图<Link to="/"></Link></Menu.Item>
              <Menu.Item key="2"><Link to="/studio">Studio</Link></Menu.Item>
              <Menu.Item key="3"><Link to="/document">文档</Link></Menu.Item>
              <Menu.Item key="4"><Link to="/github">Github</Link></Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: '0 0px' }}>
            <Route exact path="/" component={this.getWorkSpace} />
            <Route path="/studio" component={this.getStudio} />
          </Content>
        </Layout>
      </Router>
    );
  };
}

//export default App;

function mapStateToProps(state: any, ownProps: any) {
  return {

  }
}

export default connect(mapStateToProps)(App);
 