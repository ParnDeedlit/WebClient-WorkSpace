import * as React from "react";

import D3ZoomOpacity from "../../Charts/D3/zoom/D3ZoomOpacity";
import { PropertyValueSpecification } from "@mapbox/mapbox-gl-style-spec/types";
import { defaultOpacity } from '../../../utilities/map/rastertile';

const cloneDeep = require("clone-deep");

interface IProps {
  min: number;
  max: number;
  step: number;
  current: PropertyValueSpecification<number>;
  zoom: number;
  marks?: any;
  title: string;
  onChange?: Function;
}

export class ZoomOpacityScale extends React.Component<IProps, {}> {
  private _svgNode: any;
  private _chart: any;
  private _d3ZoomLevel: D3ZoomOpacity;

  public state = {
    height: 150,
    width: 280,
    stops: this.parseDefault(this.props.current)
  }

  constructor(props: IProps) {
    super(props);
    this._d3ZoomLevel = new D3ZoomOpacity();
  }

  setRef(node) {
    this._svgNode = node;
  }

  parseDefault(current: PropertyValueSpecification<number>) {
    if (typeof current === "number") {
      return {
        stops: [[0, current], [20, current]]
      };
    } else {
      if (!current.stops) return cloneDeep(defaultOpacity);
      return current.stops;
    }
  }

  componentDidMount() {
    const { height, width, stops } = this.state;
    const { title, min, max, onChange, zoom } = this.props;

    let option = {
      height: height,
      width: width,
      zoom: zoom,
      box: {
        miny: min,
        maxy: max,
      },
      margin: {
        top: 10,
        right: 10,
        bottom: 20,
        left: 30
      },
      text: {
        x: "级别",
        y: title
      },
      callback: {
        dragEnd: onChange
      }
    };
    this._chart = this._d3ZoomLevel.create(this._svgNode, stops, option);
  }

  componentDidUpdate() {

  }

  componentWillUnmount() {
    //this._d3.destroy(this._svgNode);
  }

  componentWillReceiveProps(next) {
    if (next.current.stops != this.state.stops
      || next.zoom != this.props.zoom) {
      this._d3ZoomLevel.update(
        this._svgNode,
        next.current.stops,
        next.zoom
      );
      let stops = this.parseDefault(next.current)
      this.setState({ stops: stops });
      return true;
    }
    return false;
  }

  public render() {
    let { height, width } = this.state;
    const style = { marginLeft: 5, marginTop: 5 }
    return (
      <div ref={this.setRef.bind(this)} style={style}>
        <svg height={height} width={width} />
      </div>
    );
  }
}

export default ZoomOpacityScale;
