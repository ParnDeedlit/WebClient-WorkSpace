import * as React from 'react';
import { connect } from "dva";

import { Tabs, Drawer } from 'antd';
import IconFont from '../../IconFont/mapgis';

import { LeftTabs } from '../../ConfigUI/LeftPane';

import { IDocument } from '../../../utilities/map/document';
import { NameSpaceDocument } from '../../../models/workspace';

import './index.less'

const TabPane = Tabs.TabPane;

interface ILeftPaneProps {
  document: IDocument;
  map: any;
  layout: any;
}

class LeftPaneLayer extends React.Component<ILeftPaneProps, {}> {
  //-----------------------------------------Menu 菜单相关配置 开始------------------------------------

  getTabs(tabs, document: IDocument, map, layout) {
    return tabs.map(tab => {
      return (<TabPane tab={<span><IconFont type={tab.icon} />{tab.title}</span>} key={tab.key}>
        {tab.ui(document, map, layout)}
      </TabPane>);
    });
  }

  //-----------------------------------------Menu 菜单相关配置 结束--------------------------------------------
  render() {
    const { document, map, layout } = this.props;
    const tabUI = this.getTabs(LeftTabs, document, map, layout);
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
  };
}

export default connect(mapStateToProps)(LeftPaneLayer);
