
import * as React from 'react';

import ProjectModel from './project/ProjectModel'
import TransformModel from './project/TransformModel'

interface IModelsProps {
  toggleProject: boolean;
  toggleTransform: boolean;
}

export class Models extends React.Component<IModelsProps, {}> {

  public render() {
    return (
      <div>
        <ProjectModel toggleDialog={this.props.toggleProject}></ProjectModel>
        <TransformModel toggleDialog={this.props.toggleTransform}></TransformModel>
      </div>
    );
  }
}
export default Models;