import * as React from "react";
import { connect } from "dva";

import { Modal, Input, Divider  } from 'antd';

import ProjectSelect from "../../GeoMap/Project/ProjectSelect";

import { toggleTransform } from "../../../action/command/models";

import {proj4Transform} from '../../../utilities/proj4tool';

interface ITransformModelProps {
  toggleDialog: boolean;
  dispatch: any;
}

export interface ITransformModelState {
  optionSelected: string;
  source: string;
  destination: string;
  sourcePoint: Array<number>;
  destPoint: Array<number>;
}

var self = null;

export class TransformModel extends React.Component<
  ITransformModelProps,
  ITransformModelState
> {
  public state: ITransformModelState = {
    optionSelected: "mercator",
    source: "",
    destination: "",
    sourcePoint: [0 ,0],
    destPoint: [0 ,0]
  };  

  constructor(props: ITransformModelProps) {
    super(props);
    self = this;
  }

  public render() {
    let { toggleDialog } = this.props;
    var destx = this.state.destPoint[0];
    var desty = this.state.destPoint[1];

    const styleOption = {
      color: "pink",
      fontSize: "30px",
      border: "1px #666 solid",
      marginTop: "100px"
    };
    return (
      <div style={styleOption}>
        <Modal
          title="投影变换"
          width="800px"
          visible={toggleDialog}
          onOk={this.transform.bind(this)}
          onCancel={this.closeDialog.bind(this)}
          maskClosable={true}
        >
          <ProjectSelect onChange={this.onSourceChange.bind(this)} />
          <br />
          <ProjectSelect onChange={this.onDestinationChange.bind(this)} />

          <Divider orientation="left">原始坐标</Divider>
          <Input 
            addonBefore="原始数据 横坐标X:" ref="sourcex" onChange={this.onChange.bind(this)}
          />
          <Input 
            addonBefore="原始数据 纵坐标Y:" ref="sourcey"
          />

          <Divider orientation="left">目的坐标</Divider>
          <Input 
            addonBefore="目的数据 横坐标X:" ref="destx" value={destx} disabled={true}
          />
          <Input 
            addonBefore="目的数据 纵坐标Y:" ref="desty" value={desty} disabled={true}
          />

        </Modal>
      </div>
    );
  }

  private onChange(event) {
    console.log(event.target);
  }

  private onSourceChange(field) {
    this.setState({ source: field });
  }

  private onDestinationChange(field) {
    this.setState({ destination: field });
  }

  private transform(){
    var sourcex = Number(self.refs.sourcex.state.value);
    var sourcey = Number(self.refs.sourcey.state.value);
    var sourcePoint = [sourcex, sourcey];
    
    var {source, destination } = this.state;
    var result = proj4Transform(source, destination, sourcePoint);
    this.setState({ destPoint: result }); 
  }

  private closeDialog = (): void => {
    this.props.dispatch(toggleTransform(false));
  };
}

function mapStateToProps(state: any, ownProps: any) {
  return { ...state };
}

export default connect(mapStateToProps)(TransformModel);
