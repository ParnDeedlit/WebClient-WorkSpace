import * as React from "react";
import { connect } from "dva";

import { Modal, Radio } from 'antd';

import MercatorView from "./MercatorView";
import LonlatView from "./LonlatView";
import GaussView from "./GaussView";

import { toggleProject } from "../../../action/command/project";

interface IProjectModelProps {
  toggleDialog: boolean;
  dispatch: any;
}

export interface IProjectModelState {
  optionSelected: string;
}

export class ProjectModel extends React.Component<
  IProjectModelProps,
  IProjectModelState
  > {
  public state: IProjectModelState = {
    optionSelected: "mercator"
  };

  constructor(props: IProjectModelProps) {
    super(props);
  }

  public render() {
    let { toggleDialog } = this.props;
    const { optionSelected } = this.state;
    const styleOption = {
      color: "pink",
      fontSize: "30px",
      border: "1px #666 solid",
      marginTop: "100px"
    };
    return (
      <div style={styleOption}>
        <Modal
          title="投影解释"
          width="800px"
          visible={toggleDialog}
          onOk={this._closeDialog}
          onCancel={this._closeDialog}
        >
          <Radio.Group defaultValue="mercator" buttonStyle="solid" onChange={this._onChange}>
            <Radio.Button value="mercator">墨卡托投影</Radio.Button>
            <Radio.Button value="lonlat">经纬度</Radio.Button>
            <Radio.Button value="gauss">高斯投影</Radio.Button>
          </Radio.Group>
          <br />
          {this.state.optionSelected == "mercator" && <MercatorView />}
          {this.state.optionSelected == "lonlat" && <LonlatView />}
          {this.state.optionSelected == "gauss" && <GaussView />}
        </Modal>

      </div>
    );
  }

  private _onChange = (
    e
  ): void => {
    this.setState({ optionSelected: e.target.value });
  };

  private _closeDialog = (): void => {
    this.props.dispatch(toggleProject(false))
  };
}

function mapStateToProps(state: any, ownProps: any) {
  return { ...state };
}

export default connect(mapStateToProps)(ProjectModel);
