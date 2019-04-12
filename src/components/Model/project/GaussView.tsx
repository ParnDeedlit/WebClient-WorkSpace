import * as React from "react";

import D3GaussProject from "../../Charts/D3/project/D3GaussProject";
import D3WorldData from "../../Charts/D3/project/D3WorldData";

export class MercatorView extends React.Component<{}, {}> {
  private _canvasNode: any;
  private _chart: any;
  private _d3Lonlat: D3GaussProject;

  constructor(props: {}) {
    super(props);
    this._d3Lonlat = new D3GaussProject();
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
    const style = {marginLeft:125}
    return (
      <div className="canvasContainer" ref={this.setRef.bind(this)} style={style}>
        <canvas height={500} width={500} />
      </div>
    );
  }
}

export default MercatorView;
