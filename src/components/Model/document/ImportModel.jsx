import * as React from "react";
import { connect } from "dva";

import FileReaderInput from "react-file-reader-input";
import { Modal, Button, Divider } from "antd";

import { toggleImport } from "../../../action/command/models";

/* interface IImportModelProps {
  toggleDialog: boolean;
  dispatch: any;
}

export interface IImportModelState {

} */

var self = null;

export class ImportModel extends React.Component {
  constructor(props) {
    super(props);
    self = this;
  }

  clearError() {
    this.setState({
      error: null
    });
  }
  onUpload = (_, files) => {
    const [e, file] = files[0];
    const reader = new FileReader();
    let mapStyle;

    this.clearError();

    reader.readAsText(file, "UTF-8");
    reader.onload = e => {
      try {
        mapStyle = JSON.parse(e.target.result);
        console.log("import : ", mapStyle);
      } catch (err) {
        this.setState({
          error: err.toString()
        });
        return;
      }
    };
    
    reader.onerror = e => console.log(e.target);
  };

  render() {
    let { toggleDialog } = this.props;

    return (
      <div>
        <Modal
          title="加载在线地图文档(JSON)"
          /*           width="500px" */
          visible={toggleDialog}
          onOk={this.closeDialog.bind(this)}
          onCancel={this.closeDialog.bind(this)}
          maskClosable={true}
        >
          {/* <Divider orientation="left">请选择本地地图文档JSON</Divider> */}
          <FileReaderInput onChange={this.onUpload} tabIndex="-1">
            <Button block>加载计算机style.json文件</Button>
          </FileReaderInput>
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
