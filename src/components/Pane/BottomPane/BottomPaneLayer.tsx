import * as React from 'react';
import { connect } from "dva";

import { Tabs } from 'antd';
import IconFont from '../../IconFont/mapgis';

import {
  NameSpaceDocument, 
  NameSpaceMapState, NameSpaceMapOption,
  NameSpaceLayoutState, NameSpaceLayoutKey
} from '../../../models/workspace';
import IDocument from '../../../utilities/map/document';
import { BottomTabs, BottomDefaultKey } from '../../ConfigUI/BottomPane';

import './index.less'

const TabPane = Tabs.TabPane;

interface IBottomPaneProps {
  document: IDocument;
  map: any;
  layout: any;
}

class BottomPaneLayer extends React.Component<IBottomPaneProps, {}> {
  //-----------------------------------------Menu 菜单相关配置 开始------------------------------------
  getTabs(tabs, document, map, layout) {
    return tabs.map(tab => {
      return (<TabPane tab={<span><IconFont type={tab.icon} />{tab.title}</span>} key={tab.key}>
        {tab.ui(document, map, layout)}
      </TabPane>);
    });
  }

  //-----------------------------------------Menu 菜单相关配置 结束--------------------------------------------
  render() {
    const { map, layout, document } = this.props;
    const tabUI = this.getTabs(BottomTabs, document, map, layout);
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
    document: state[NameSpaceDocument],
    map: {
      state: state[NameSpaceMapState],
      options: state[NameSpaceMapOption],
    },
    layout: {
      state: state[NameSpaceLayoutState],
      key: state[NameSpaceLayoutKey],
    },
  };
}

export default connect(mapStateToProps)(BottomPaneLayer);
