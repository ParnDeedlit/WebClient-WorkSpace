import * as React from 'react';
import { connect } from "dva";

import { Tabs, Drawer } from 'antd';
import IconFont from '../../IconFont/mapgis';

import { LeftTabs, LeftDefaultKey } from '../../ConfigUI/LeftPane';

import './index.less'

const TabPane = Tabs.TabPane;

interface ILeftPaneProps {
  map: any;
  layout: any;
}

class LeftPaneLayer extends React.Component<ILeftPaneProps, {}> {
  //-----------------------------------------Menu 菜单相关配置 开始------------------------------------

  getTabs(tabs, map, layout) {
    return tabs.map(tab => {
      return (<TabPane tab={<span><IconFont type={tab.icon} />{tab.title}</span>} key={tab.key}>
          {tab.ui(map, layout)}
      </TabPane>);
    });
  }

  //-----------------------------------------Menu 菜单相关配置 结束--------------------------------------------
  render() {
    const { map, layout } = this.props;
    const tabUI = this.getTabs(LeftTabs, map, layout);
    return (
      <div className="card-container">
        <Tabs type="line" size="small" tabBarGutter={1}>
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

export default connect(mapStateToProps)(LeftPaneLayer);
