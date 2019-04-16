import * as React from "react";
import { connect } from "dva";

import { Fabric } from "office-ui-fabric-react/lib/Fabric";

import ExtendManager from "../Manager/ExtendManager";
import ToolbarManager from "../Toolbar/ToolbarManager";
import MapRenderer from "../GeoMap/Map/Map";
import SideMenuayer from '../Pane/LeftPane/LeftPaneLayer';

import { initializeIcons } from "@uifabric/icons";

initializeIcons();

interface IAppProps {
  content: any;
  size?: string; //非必填
  map: any;
  dispatch: any;
}
interface IAppState {
  id: number;
  isMenuVisible: boolean;
}

class WorkSpace extends React.Component<IAppProps, IAppState> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className={"workspace-layout-all"}>
        <div className={"workspace-layout-top"}>
          <ToolbarManager />
        </div>
        <div className={"workspace-layout-center"}>
          <div className={"workspace-layout-right"}>
          </div>
          <div className={"workspace-layout-left"}>
            <SideMenuayer />
          </div>
        </div>
        <div className={"workspace-layout-bottom"}>
          
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: any, ownProps: any) {
  return {
    content: state.content,
    map: {
      style: state.mapstyle,
      state: state.mapstate,
      options: state.mapoptions
    },
  };
}

export default connect(mapStateToProps)(WorkSpace);
