import * as React from 'react';
import { connect } from "dva";

import { Tabs } from 'antd';
import IconFont from '../../IconFont/mapgis';
import { RightTabs, RightDefaultKey } from '../../ConfigUI/RightPane';

import './index.less'

const TabPane = Tabs.TabPane;

interface IRightPaneProps {
  map: any;
  activeKey: string;
}

interface IRightPaneState {
  currentKey: string;
}

class RightPaneLayer extends React.Component<IRightPaneProps, IRightPaneState> {
  //-----------------------------------------Menu 菜单相关配置 开始------------------------------------
  state : IRightPaneState = {
    currentKey : RightDefaultKey
  }

  getTabs(tabs) {
    return tabs.map(tab => {
      return (<TabPane tab={<span><IconFont type={tab.icon} />{tab.title}</span>} key={tab.key}>
        <div className="right-pane-wraper">
          {tab.ui}
        </div>
      </TabPane>);
    });
  }

  //-----------------------------------------Menu 菜单相关配置 结束--------------------------------------------
  render() {
    const { document } = this.props.map;
    const { activeKey } = this.props;
    let { currentKey } = this.state;

    currentKey = activeKey;

    const tabUI = this.getTabs(RightTabs);
    return (
      <div >
        <Tabs type="line" size="small"
          tabBarGutter={1} tabPosition="bottom"
          defaultActiveKey={currentKey}
        >
          {tabUI}
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
