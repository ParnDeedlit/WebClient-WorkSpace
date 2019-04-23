import * as React from "react";
import { connect } from "dva";

import Slugify from "slugify";
import { saveAs } from "file-saver";

import { Modal, Button } from "antd";

import { toggleExport } from "../../../action/command/models";
import {
  NameSpaceDocument,
  NameSpaceMapState,
  NameSpaceMapOption,
  NameSpaceMapStyle,
  NameSpaceLayoutState,
  NameSpaceLayoutKey
} from "../../../models/workspace";

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
    
    const blob = new Blob([JSON.stringify(document)], {
      type: "application/json;charset=utf-8"
    });
    let exportName;
    if (document.name) {
      exportName = Slugify(document.name, {
        replacement: "_",
        lower: true
      });
    } else {
      exportName = "未命名";
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
            保存地图文档JSON格式文件
          </Button>
        </Modal>
      </div>
    );
  }

  closeDialog = () => {
    this.props.dispatch(toggleExport(false));
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
