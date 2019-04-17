import * as React from 'react';
import { connect } from "dva";

import { Tabs, Drawer } from 'antd';
import IconFont from '../../IconFont/mapgis';

import './index.less'

const TabPane = Tabs.TabPane;

interface IRightPaneProps {
  map: any;
}

class RightPaneLayer extends React.Component<IRightPaneProps, {}> {
  //-----------------------------------------Menu 菜单相关配置 开始------------------------------------



  //-----------------------------------------Menu 菜单相关配置 结束--------------------------------------------
  render() {
    const { document } = this.props.map;
    return (
      <div className="right-pane-layer">
        <Tabs type="line" size="small" tabBarGutter={1} tabPosition="bottom">
          <TabPane tab={<span><IconFont type="icon-map" />数据源</span>} key="1">
            <div className="right-pane-wraper">
              
            </div>
          </TabPane>
          <TabPane tab={<span><IconFont type="icon-shuxingliebiaoxiangqing" />图元属性</span>} key="2">
            <div className="right-pane-wraper">
              Content of Tab Pane 2
            </div>
          </TabPane>
          <TabPane tab={<span><IconFont type="icon-shuxingliebiaoxiangqing" />工具箱</span>} key="3">
            <div className="right-pane-wraper">
              Content of Tab Pane 3
            </div>
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

export default connect(mapStateToProps)(RightPaneLayer);
