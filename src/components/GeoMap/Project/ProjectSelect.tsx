import * as React from "react";

import { Cascader, Input } from 'antd';

import {
  getProj4sCascader,
  getProj4sDetail
} from "../../../utilities/proj4tool";

interface IProjectSelectProps {
  onChange: Function;
}

export interface IProjectSelectState {
  projs: Array<any>;
  proj: string;
}

export class ProjectSelect extends React.Component<
  IProjectSelectProps,
  IProjectSelectState
> {
  public state: IProjectSelectState = {
    projs: getProj4sCascader(),
    proj: ""
  };

  private defaultProjs = getProj4sCascader();

  constructor(props: IProjectSelectProps) {
    super(props);
  }

  public render() {
    return (
      <div>
        <Cascader options={this.state.projs} 
          onChange={this.onMenuChange.bind(this)}
          placeholder="请选择源投影参考系" />
        <Input // prettier-ignore
          addonBefore="proj4:"
          value={this.state.proj}
          onChange={this.onFieldChange.bind(this)}
        />
      </div>
    );
  }

  private onMenuChange(event, item) {
    console.log(event, item);
    if(item.length <= 0) return;
    if(!item[0].children || item[0].children.length <= 0) return;
    var id = item[0].children[0].value;
    var proj = getProj4sDetail(id);
    this.setState({ proj: proj });
    this.props.onChange(proj);
  }

  private onFieldChange(event, field) {
    this.props.onChange(field);
  }

}

export default ProjectSelect;
