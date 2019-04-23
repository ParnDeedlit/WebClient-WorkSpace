import * as React from "react";
import { connect } from "dva";

import Slugify from "slugify";
import { saveAs } from "file-saver";

import { Modal, Button, Divider } from "antd";

import { toggleImport } from "../../../action/command/models";
import {
  NameSpaceDocument, NameSpaceMapState, NameSpaceMapOption, NameSpaceMapStyle,
  NameSpaceLayoutState, NameSpaceLayoutKey
} from '../../models/workspace';

var self = null;

export class ExportModel extends React.Component {
  constructor(props) {
    super(props);
    self = this;
  }

  clearError() {
    this.setState({
      error: null
    });
  }

  downloadStyle() {
    const document = this.props.document;

    const blob = new Blob([document], {
      type: "application/json;charset=utf-8"
    });
    let exportName;
    if (document.name) {
      exportName = Slugify(document.name, {
        replacement: "_",
        lower: true
      });
    } else {
      exportName = this.props.document.id;
    }
    saveAs(blob, exportName + ".json");
  }

  render() {
    let { toggleDialog } = this.props;

    return (
      <div>
        <Modal
          title="保存在线地图文档(JSON)"
          visible={toggleDialog}
          onOk={this.closeDialog.bind(this)}
          onCancel={this.closeDialog.bind(this)}
          maskClosable={true}
        >
          <Button block onClick={this.downloadStyle.bind(this)}>
            加载计算机style.json文件
          </Button>
        </Modal>
      </div>
    );
  }

  closeDialog = () => {
    this.props.dispatch(toggleImport(false));
  };
}

function mapStateToProps(state, ownProps) {
  return {
    document: state[NameSpaceDocument],
    map: {
      style: state[NameSpaceMapStyle],
      state: state[NameSpaceMapState],
      options: state[NameSpaceMapOption]
    },
    layout: {
      state: state[NameSpaceLayoutState],
      key: state[NameSpaceLayoutKey]
    }
  };
}

export default connect(mapStateToProps)(ExportModel);
