import * as React from "react";
import { connect } from "dva";

import FileReaderInput from "react-file-reader-input";
import { Modal, Button, Spin, Alert } from "antd";

import { toggleImport } from "../../../action/command/models";
import { resetDocument } from "../../../utilities/map/document";

var self = null;

export class ImportModel extends React.Component {
  constructor(props) {
    super(props);
    self = this;
    this.state = {
      loading: false
    };
  }

  getTip() {
    const tooltip = {
      name: "新地图文档",
      current: "默认激活状态",
      backgrounds: "默认背景",
      layers: "默认图层"
    };
    return JSON.stringify(tooltip, null, 4);
  }

  clearError() {
    this.setState({
      error: null
    });
  }

  onUpload = (_, files) => {
    const [e, file] = files[0];
    const reader = new FileReader();
    let newDoc;

    this.setState({ loading: true });
    this.clearError();

    reader.readAsText(file, "UTF-8");
    reader.onload = e => {
      try {
        newDoc = JSON.parse(e.target.result);   
      } catch (err) {
        this.setState({
          error: err.toString()
        });
        this.setState({ loading: false });
        this.closeDialog();
        return;
      }
      this.setState({ loading: false });
      this.props.dispatch(resetDocument(newDoc));
      this.closeDialog();
    };

    reader.onerror = e => console.log(e.target);
  };

  render() {
    let { toggleDialog } = this.props;
    let message = this.state.loading ? "网络请求中" : "请选择本地地图文档样式";
    let description = this.state.loading
      ? "正在解析地图文档格式，请稍等"
      : "目前只支持下面格式" + this.getTip();
    return (
      <div>
        <Modal
          title="加载在线地图文档(JSON)"
          visible={toggleDialog}
          onOk={this.closeDialog.bind(this)}
          onCancel={this.closeDialog.bind(this)}
          maskClosable={true}
        >
          <FileReaderInput onChange={this.onUpload} tabIndex="-1">
            <Button block>加载计算机style.json文件</Button>
          </FileReaderInput>

          <br />

          <Spin spinning={this.state.loading}>
            <Alert
              message={message}
              description={description}
              type="warning"
              showIcon
            />
          </Spin>
        </Modal>
      </div>
    );
  }

  closeDialog = () => {
    this.props.dispatch(toggleImport(false));
  };
}

function mapStateToProps(state, ownProps) {
  return { ...state };
}

export default connect(mapStateToProps)(ImportModel);
