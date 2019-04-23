
import * as React from 'react';

import ProjectModel from './project/ProjectModel'
import TransformModel from './project/TransformModel'
import ImportModel from './document/ImportModel.jsx';
import ExportModel from './document/ExportModel.jsx';

interface IModelsProps {
  toggleProject: boolean;
  toggleTransform: boolean;
  toggleImport: boolean;
  toggleExport: boolean;
}

export class Models extends React.Component<IModelsProps, {}> {

  public render() {
    return (
      <div>
        <ProjectModel toggleDialog={this.props.toggleProject}></ProjectModel>
        <TransformModel toggleDialog={this.props.toggleTransform}></TransformModel>
        <ImportModel toggleDialog={this.props.toggleImport}></ImportModel>
        <ExportModel toggleDialog={this.props.toggleExport}></ExportModel>
      </div>
    );
  }
}
export default Models;