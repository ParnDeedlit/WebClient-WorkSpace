import * as React from "react";

import D3ZoomOpacity from "../../Charts/D3/zoom/D3ZoomOpacity";

export class ZoomLevelScale extends React.Component<{}, {}> {
  private _svgNode: any;
  private _chart: any;
  private _d3ZoomLevel: D3ZoomOpacity;

  public state = {
    height: 150,
    width: 280
  }

  constructor(props: {}) {
    super(props);
    this._d3ZoomLevel = new D3ZoomOpacity();
  }

  setRef(node) {
    this._svgNode = node;
  }

  onScaleChange(value) {
    this.setState({ scale: value });
  }

  componentDidMount() {
    let option = {
      height: this.state.height,
      width: this.state.width,
      margin: {
        top: 10,
        right: 10,
        bottom: 20,
        left: 30
      },
      text: {
        x: "级别",
        y: "透明度"
      }
    };
    let stops = [[0, 0.4], [5, 0.4], [10, 0.6], [15, 0.8], [20, 0.8]];
    this._chart = this._d3ZoomLevel.create(this._svgNode, stops, option);
  }

  componentDidUpdate() {
    /*         this._d3.update(
          this._svgNode,
          this.state.geometryJson,
          this.state.geometryBboxScale,
          this.state.geometryCenter,
          this.state.scale
        ); */
  }

  componentWillUnmount() {
    //this._d3.destroy(this._svgNode);
  }

  componentWillReceiveProps(next) { }
  public render() {
    let { height, width } = this.state;
    const style = { marginLeft: 5 }
    return (
      <div ref={this.setRef.bind(this)} style={style}>
        <svg height={height} width={width}  />
      </div>
    );
  }
}

export default ZoomLevelScale;
