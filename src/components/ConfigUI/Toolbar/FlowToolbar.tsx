import * as React from 'react';
import { connect } from 'dva';

import { Divider } from 'antd';
import ToolbarButton from '../../Toolbar/EditorToolbar/ToolbarButton';
import ToolbarMenu from '../../Toolbar/EditorToolbar/ToolbarMenu';

import { DocumentItem, bindDocumentMenus } from './ConfigDocument';
import { AttrItem, bindAttrMenus } from './ConfigAttr';
import { AddItems, bindAddMenus } from './ConfigAddItems';
import { BackItems, bindBackMenus } from './ConfigBackItems';
import { AnalysisItems, bindAnalysisMenus } from './ConfigAnalysisItems';

import Models from '../../Model/Models';

import { toggleProject, toggleTransform } from '../../../action/command/project';
import { toggleLeftLayout, toggleRightLayout, toggleBottomLayout } from '../../../action/command/layout';
import { toggleBackgroud } from '../../../action/map/document';


interface IToolbarProps {
  content: any,
  dispatch: any,
  commandproject: any,
}

interface IToolbarState {
  id: number,
  toggleTransform: boolean,
  toggleProject: boolean,
  current: string,
}

export class FlowToolbar extends React.Component<IToolbarProps, IToolbarState> {
  constructor(props: any) {
    super(props)
    this.state = {
      id: 1,
      toggleTransform: false,
      toggleProject: false,
      current: 'mail',
    }
  }

  private defaultState = {
    id: 1,
    toggleTransform: false,
    toggleProject: false,
    current: 'mail',
  }

  handleAddItemsClick = (e) => {
    this.setState({
      current: e.key,
    });
    switch (e.key) {
      case "projection":
        this.toggleProject();
        break;
      case "transform":
        this.toggleTransform();
        break
    }
  }

  handleBackgroundClick = (id) => {
    this.toggleBackgroud(id);
  }

  private toggleProject = () => { this.props.dispatch(toggleProject(true)) }
  private toggleTransform = () => { this.props.dispatch(toggleTransform(true)) }

  private toggleLeftLayout = () => { this.props.dispatch(toggleLeftLayout(true)) }
  private toggleBottomLayout = () => { this.props.dispatch(toggleBottomLayout(true)) }

  private toggleBackgroud = (id) => { this.props.dispatch(toggleBackgroud(id)) }


  render(): JSX.Element {
    const toggleProject = this.props.commandproject.toggleProject;
    const toggleTransform = this.props.commandproject.toggleTransform;

    const addItemBind = bindAddMenus(this.handleAddItemsClick);
    const analysisItemBind = bindAnalysisMenus(this.handleAddItemsClick);
    const backItemBind = bindBackMenus(this.handleBackgroundClick);
    const documentItemBind = bindDocumentMenus(this.handleAddItemsClick, DocumentItem.text);
    const attrItemBind = bindAttrMenus(this.handleAddItemsClick, AttrItem.text);

    DocumentItem.ui_content = documentItemBind;
    DocumentItem.command = this.toggleLeftLayout;
    AttrItem.ui_content = attrItemBind;
    AttrItem.command = this.toggleBottomLayout;
    AddItems.ui_content = addItemBind;
    AnalysisItems.ui_content = analysisItemBind;
    BackItems.ui_content = backItemBind;

    return (
      <div>
        <div className="mapgis-command-toolbar">
          <ToolbarMenu {...DocumentItem} />
          <ToolbarMenu {...AttrItem} />
          <ToolbarMenu {...AddItems} />
          <Divider type="vertical" />
          <ToolbarMenu {...AnalysisItems} />
          <ToolbarMenu {...BackItems} />
          <Divider type="vertical" />
          <ToolbarButton command="undo" />
          <ToolbarButton command="redo" />
          <Divider type="vertical" />
          <ToolbarButton command="copy" />
          <ToolbarButton command="paste" />
          <ToolbarButton command="delete" />
          <Divider type="vertical" />
          <ToolbarButton command="zoomIn" icon="zoom-in" text="Zoom In" />
          <ToolbarButton command="zoomOut" icon="zoom-out" text="Zoom Out" />
          <ToolbarButton command="autoZoom" icon="fit-map" text="Fit Map" />
          <ToolbarButton command="resetZoom" icon="actual-size" text="Actual Size" />
          <Divider type="vertical" />
          <ToolbarButton command="toBack" icon="to-back" text="To Back" />
          <ToolbarButton command="toFront" icon="to-front" text="To Front" />
          <Divider type="vertical" />
          <ToolbarButton command="multiSelect" icon="multi-select" text="Multi Select" />
          <ToolbarButton command="addGroup" icon="group" text="Add Group" />
          <ToolbarButton command="unGroup" icon="ungroup" text="Ungroup" />
        </div>
        <div className="mapgis-command-model">
          <Models
            toggleProject={toggleProject}
            toggleTransform={toggleTransform}
          ></Models>
        </div>
      </div>
    );
  }

};

function mapStateToProps(state: any, ownProps: any) {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(FlowToolbar);
