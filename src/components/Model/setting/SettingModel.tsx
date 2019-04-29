import * as React from "react";
import { connect } from "dva";

import { Modal, Tabs } from "antd";

import { toggleSetting } from "../../../action/command/models";
import { NameSpaceDocument } from "../../../models/workspace";

import SettingMap from './SettingMap';
import IDocument from '../../../utilities/map/document';

const TabPane = Tabs.TabPane;

interface ISettingProps {
  toggleDialog: boolean;
  document: IDocument;
  dispatch: any;
}

export class SettingModel extends React.Component<ISettingProps, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    let { toggleDialog, dispatch, document } = this.props;

    return (
      <div>
        <Modal
          title="设置界面"
          visible={toggleDialog}
          onOk={this.closeDialog.bind(this)}
          onCancel={this.closeDialog.bind(this)}
          maskClosable={true}
        >
          <Tabs tabPosition="left">
            <TabPane tab="地图引擎" key="1">
              <SettingMap dispatch={dispatch} document={document} />
            </TabPane>
            <TabPane tab="密钥设置" key="2">

            </TabPane>
            <TabPane tab="其他设置" key="3">

            </TabPane>
          </Tabs>
        </Modal>
      </div>
    );
  }

  closeDialog = () => {
    this.props.dispatch(toggleSetting(false));
  };
}

function mapStateToProps(state, ownProps) {
  return {
    document: state[NameSpaceDocument]
  };
}

export default connect(mapStateToProps)(SettingModel);
