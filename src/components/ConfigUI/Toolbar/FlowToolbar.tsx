import * as React from 'react';
import { connect } from 'dva';

import { Divider, Row, Col } from 'antd';

import { NameSpaceDocument } from '../../../models/workspace';

import { IDocument } from '../../../utilities/map/document';
import { LayerType } from '../../../utilities/map/layer';

import {isEnable} from '../../../utilities/toolbar';

import ToolbarButton from '../../Toolbar/EditorToolbar/ToolbarButton';



interface IToolbarProps {
  content: any,
  dispatch: any,
  document: IDocument,
}

interface IToolbarState {
  id: string,
  supports: Array<LayerType>,
}

export class FlowToolbar extends React.Component<IToolbarProps, IToolbarState> {
  constructor(props: any) {
    super(props)
    this.state = {
      id: "@mapgis/basicbar",
      supports: [LayerType.RasterTile, LayerType.VectorTile],
    }
  }

  render(): JSX.Element {
    const { current } = this.props.document;
    
    let enable = isEnable(current, this.state.supports);

    return (
      <div>
        <div className="mapgis-command-toolbar">
          <ToolbarButton enable={enable} command="zoomIn" icon="zoom-in" text="Zoom In" />
          <ToolbarButton enable={enable} command="zoomOut" icon="zoom-out" text="Zoom Out" />
          <ToolbarButton enable={enable} command="autoZoom" icon="fit-map" text="Fit Map" />
          <ToolbarButton enable={enable} command="resetZoom" icon="actual-size" text="Actual Size" />
          <Divider type="vertical" />
          <ToolbarButton enable={enable} command="toBack" icon="to-back" text="To Back" />
          <ToolbarButton enable={enable} command="toFront" icon="to-front" text="To Front" />
          <Divider type="vertical" />
          <ToolbarButton enable={enable} command="multiSelect" icon="multi-select" text="Multi Select" />
          <ToolbarButton enable={enable} command="addGroup" icon="group" text="Add Group" />
          <ToolbarButton enable={enable} command="unGroup" icon="ungroup" text="Ungroup" />
          <Divider type="vertical" />
        </div>
      </div>
    );
  }

};

function mapStateToProps(state: any, ownProps: any) {
  return {
    document: state[NameSpaceDocument],
  }
}

export default connect(mapStateToProps)(FlowToolbar);
