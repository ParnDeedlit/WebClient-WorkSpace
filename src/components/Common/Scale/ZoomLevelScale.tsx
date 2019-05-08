import * as React from "react";

import D3ZoomOpacity from "../../Charts/D3/zoom/D3ZoomOpacity";
import { PropertyValueSpecification } from "@mapbox/mapbox-gl-style-spec/types";
import { defaultOpacity } from '../../../utilities/map/rastertile';

interface IProps {
  min: number;
  max: number;
  step: number;
  current: PropertyValueSpecification<number>;
  marks?: any;
  title: string;
  onChange?: Function;
}

export class ZoomLevelScale extends React.Component<IProps, {}> {
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
      return defaultOpacity;
    } else {
      if (!current.stops) return defaultOpacity;
      return current.stops;
    }
  }

  componentDidMount() {
    const { height, width } = this.state;
    const { title, min, max, onChange } = this.props;

    let option = {
      height: height,
      width: width,
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
    let stops = this.state.stops;
    this._chart = this._d3ZoomLevel.create(this._svgNode, stops, option);
  }

  componentDidUpdate() {

  }

  componentWillUnmount() {
    //this._d3.destroy(this._svgNode);
  }

  componentWillReceiveProps(next) {
    if (next.current.stops != this.state.stops) {
      this._d3ZoomLevel.update(
        this._svgNode,
        next.current.stops
      );
      return true;
    }
    return false;
  }

  public render() {
    let { height, width } = this.state;
    const style = { marginLeft: 5 }
    return (
      <div ref={this.setRef.bind(this)} style={style}>
        <svg height={height} width={width} />
      </div>
    );
  }
}

export default ZoomLevelScale;
