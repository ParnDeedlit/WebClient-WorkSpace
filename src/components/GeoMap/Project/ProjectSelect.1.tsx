import * as React from "react";

import {
  DefaultButton,
  PrimaryButton
} from "office-ui-fabric-react/lib/Button";
import {
  IContextualMenuListProps,
  IContextualMenuItem
} from "office-ui-fabric-react/lib/ContextualMenu";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { IRenderFunction } from "@uifabric/utilities";

import {
  getProj4sMenus,
  getProj4sDetail
} from "../../../utilities/proj4tool";

interface IProjectSelectProps {
  onChange: Function;
}

export interface IProjectSelectState {
  projs: IContextualMenuItem[];
  proj: string;
}

export class ProjectSelect extends React.Component<
  IProjectSelectProps,
  IProjectSelectState
> {
  public state: IProjectSelectState = {
    projs: getProj4sMenus(this.onMenuChange.bind(this)),
    proj: ""
  };

  private defaultProjs = getProj4sMenus(this.onMenuChange.bind(this));

  constructor(props: IProjectSelectProps) {
    super(props);
  }

  public render() {
    return (
      <div>
        <DefaultButton
          text="请选择源投影参考系"
          menuProps={{
            onRenderMenuList: this._renderSourceMenuList,
            title: "源投影坐标系",
            shouldFocusOnMount: true,
            items: this.state.projs
          }}
        />
        <TextField // prettier-ignore
          prefix="proj4:"
          ariaLabel="Example text field with proj4 prefix"
          value={this.state.proj}
          onChange={this.onFieldChange.bind(this)}
        />
      </div>
    );
  }

  private onMenuChange(event, item) {
    var proj = getProj4sDetail(item.key);
    this.setState({ proj: proj });
    this.props.onChange(proj);
  }

  private onFieldChange(event, field) {
    this.props.onChange(field);
  }

  private _onAbort = () => {
    this.setState({ projs: this.defaultProjs });
  };

  private _onChange = (newValue: string) => {
    const filteredItems = this.defaultProjs.filter(
      item =>
        item.text &&
        item.text.toLowerCase().indexOf(newValue.toLowerCase()) !== -1
    );

    if (!filteredItems || !filteredItems.length) {
      filteredItems.push({
        key: "no_results",
        onRender: (item, dismissMenu) => (
          <div
            key="no_results"
            style={{
              width: "100%",
              height: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Icon iconName="SearchIssue" title="没有匹配项" />
            <span>没有匹配项</span>
          </div>
        )
      });
    }

    this.setState((prevState, props) => ({
      projs: filteredItems
    }));
  };

  private _renderSourceMenuList = (
    menuListProps: IContextualMenuListProps,
    defaultRender: IRenderFunction<IContextualMenuListProps>
  ) => {
    return (
      <div>
        <div style={{ borderBottom: "1px solid #ccc" }}>
          <SearchBox
            ariaLabel="Filter actions by text"
            placeholder="过滤条件"
            onAbort={this._onAbort}
            onChange={this._onChange}
            styles={{
              root: [{ margin: "8px" }]
            }}
          />
        </div>
        {defaultRender(menuListProps)}
      </div>
    );
  };
}

export default ProjectSelect;
