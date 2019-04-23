import * as React from 'react';
import { connect } from 'dva';

import { Divider, Row, Col } from 'antd';

import ToolbarMenu from '../../Toolbar/EditorToolbar/ToolbarMenu';

import { DocumentItem, bindDocumentMenus } from './ConfigDocument';
import { AttrItem, bindAttrMenus } from './ConfigAttr';
import { AddItems, bindAddMenus } from './ConfigAddItems';
import { BackItems, bindBackMenus } from './ConfigBackItems';
import { AnalysisItems, bindAnalysisMenus } from './ConfigAnalysisItems';

import Models from '../../Model/Models';

import {NameSpaceCommand} from '../../../models/workspace';

import { toggleProject, toggleTransform, toggleImport, toggleExport } from '../../../action/command/models';
import { toggleLeftLayout, toggleRightLayout, toggleBottomLayout } from '../../../action/command/layout';
import { toggleBackgroud } from '../../../utilities/document';

interface IToolbarProps {
  content: any,
  dispatch: any,
  commandproject: any,
}

interface IToolbarState {
  id: number
}

export class DocToolbar extends React.Component<IToolbarProps, IToolbarState> {
  constructor(props: any) {
    super(props)
    this.state = {
      id: 1
    }
  }

  handleDocItemsClick = (e) => {
    switch (e.key) {
      case "docment-import":
        console.log("docment-import");
        this.toggleImport();
        break;
      case "document-export":
        this.toggleExport();
        break
    }
  }

  handleAddItemsClick = (e) => {
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

  private toggleImport= () => {this.props.dispatch(toggleImport(true))}
  private toggleExport= () => {this.props.dispatch(toggleExport(true))}

  private toggleProject = () => { this.props.dispatch(toggleProject(true)) }
  private toggleTransform = () => { this.props.dispatch(toggleTransform(true)) }

  private toggleLeftLayout = () => { this.props.dispatch(toggleLeftLayout(true)) }
  private toggleBottomLayout = () => { this.props.dispatch(toggleBottomLayout(true)) }

  private toggleBackgroud = (id) => { this.props.dispatch(toggleBackgroud(id)) }


  render(): JSX.Element {
    const toggleProject = this.props[NameSpaceCommand].toggleProject;
    const toggleTransform = this.props[NameSpaceCommand].toggleTransform;
    const toggleImport = this.props[NameSpaceCommand].toggleImport;
    const toggleExport = this.props[NameSpaceCommand].toggleExport;

    const addItemBind = bindAddMenus(this.handleDocItemsClick);
    const analysisItemBind = bindAnalysisMenus(this.handleAddItemsClick);
    const backItemBind = bindBackMenus(this.handleBackgroundClick);
    const documentItemBind = bindDocumentMenus(null, DocumentItem.text);
    const attrItemBind = bindAttrMenus(null, AttrItem.text);

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
          <ToolbarMenu {...AnalysisItems} />
          <ToolbarMenu {...BackItems} />
          <Divider type="vertical" />
        </div>
        <div className="mapgis-command-model">
          <Models
            toggleProject={toggleProject}
            toggleTransform={toggleTransform}
            toggleImport={toggleImport}
            toggleExport={toggleExport}
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

export default connect(mapStateToProps)(DocToolbar);
