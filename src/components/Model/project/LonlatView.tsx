import * as React from "react";

import D3LonlatProject from "../../Charts/D3/project/D3LonlatProject";
import D3WorldData from "../../Charts/D3/project/D3WorldData";

export class MercatorView extends React.Component<{}, {}> {
  private _canvasNode: any;
  private _chart: any;
  private _d3Lonlat: D3LonlatProject;

  constructor(props: {}) {
    super(props);
    this._d3Lonlat = new D3LonlatProject();
  }

  setRef(node) {
    this._canvasNode = node;
  }

  onScaleChange(value) {
    this.setState({ scale: value });
  }

  componentDidMount() {
    this._chart = this._d3Lonlat.create(this._canvasNode, D3WorldData);
  }

  componentDidUpdate() {
    /*         this._d3.update(
          this._canvasNode,
          this.state.geometryJson,
          this.state.geometryBboxScale,
          this.state.geometryCenter,
          this.state.scale
        ); */
  }

  componentWillUnmount() {
    //this._d3.destroy(this._canvasNode);
  }

  componentWillReceiveProps(next) {}
  public render() {
    return (
      <div className="canvasContainer" ref={this.setRef.bind(this)}>
        <canvas height={400} width={750} />
      </div>
    );
  }
}

export default MercatorView;
