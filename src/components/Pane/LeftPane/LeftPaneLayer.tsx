import * as React from 'react';
import { connect } from "dva";

import { Tabs, Drawer } from 'antd';
import IconFont from '../../IconFont/mapgis';

import Document from '../../GeoMap/Document/Document';

import './index.less'

const TabPane = Tabs.TabPane;

interface ILeftPaneProps {
  map: any;
}

class LeftPaneLayer extends React.Component<ILeftPaneProps, {}> {
  //-----------------------------------------Menu 菜单相关配置 开始------------------------------------



  //-----------------------------------------Menu 菜单相关配置 结束--------------------------------------------
  render() {
    const {document} = this.props.map;
    return (
      <div className="card-container">
        <Tabs type="line" size="small" tabBarGutter={1}>
          <TabPane tab={<span><IconFont type="icon-map" />地图文档</span>} key="1">
            <Document document={document}/>
          </TabPane>  
          <TabPane tab={<span><IconFont type="icon-shuxingliebiaoxiangqing" />属性</span>} key="2">
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
          </TabPane>
          <TabPane tab={<span><IconFont type="icon-Geometry" />图形</span>} key="3">
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
          </TabPane>
          <TabPane tab={<span><IconFont type="icon-chart" />图表</span>} key="4">
          </TabPane>
          <TabPane tab={<span><IconFont type="icon-Directions" />流向图</span>} key="5">
          </TabPane>
          <TabPane tab={<span><IconFont type="icon-briefInfosprite" />图例</span>} key="6">
          </TabPane>
          <TabPane tab={<span><IconFont type="icon-other" />其他</span>} key="7">
          </TabPane>
        </Tabs>
      </div >
    );
  }
}

function mapStateToProps(state: any, ownProps: any) {
  return {
      content: state.content,
      map: {
          style: state.mapstyle,
          state: state.mapstate,
          options: state.mapoptions,
          document: state.mapdocument
      },
      layout: {
          state: state.layoutstate
      }
  };
}

export default connect(mapStateToProps)(LeftPaneLayer);
