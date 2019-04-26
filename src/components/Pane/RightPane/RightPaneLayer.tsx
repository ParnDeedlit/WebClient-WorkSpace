import * as React from 'react';
import { connect } from "dva";

import { Tabs } from 'antd';
import IconFont from '../../IconFont/mapgis';
import { RightTabs, RightDefaultKey } from '../../ConfigUI/RightPane';

import './index.less'
import { IDocument } from '../../../utilities/document';
import { NameSpaceDocument } from '../../../models/workspace';

const TabPane = Tabs.TabPane;

interface IRightPaneProps {
  document: IDocument;
  map: any;
  activeKey: string;
}

interface IRightPaneState {
  currentKey: string;
}

class RightPaneLayer extends React.Component<IRightPaneProps, IRightPaneState> {
  //-----------------------------------------Menu 菜单相关配置 开始------------------------------------
  state: IRightPaneState = {
    currentKey: RightDefaultKey
  }

  getTabs(tabs, document: IDocument) {
    return tabs.map(tab => {
      return (<TabPane tab={<span><IconFont type={tab.icon} />{tab.title}</span>} key={tab.key}>
        {tab.ui(document)}
      </TabPane>);
    });
  }

  //-----------------------------------------Menu 菜单相关配置 结束--------------------------------------------
  render() {
    const { document } = this.props;

    const tabUI = this.getTabs(RightTabs, document);
    return (
      <div className="card-container">
        <Tabs type="line" size="small"
          tabBarGutter={1} tabPosition="top"
        >
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

export default connect(mapStateToProps)(RightPaneLayer);
