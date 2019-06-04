import { BBox } from "@turf/helpers";

import { NameSpaceMapState } from "../models/workspace";

/**
 * @class BBox
 * @see https://tools.ietf.org/html/rfc7946#section-5
 * @description 数组描述空间范围: [minx, miny, maxx, maxy].
 */
export type Extent2d = [number, number, number, number];
export type Extent3d = [number, number, number, number, number, number];
export type Extent = Extent2d | Extent3d;

export class Bounds {
  left: number;
  top: number;
  right: number;
  bootom: number;
}

/**
 * @class Position 封装类
 * @description Positon = Positon2d | Positon3d | Positon2dArray | Positon3dArray;
 */
export type Positon2dArray = [number, number];
export type Positon3dArray = [number, number, number];

export class Positon2d {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export class Positon3d {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

/**
 * @description 后来实际发现结合dva/redux等框架的前提下， 使用属性x/y/z存在映射问题，先使用数组形式，潘卓然
 */
export type Positon /* Positon2d | Positon3d | */ =
  | Positon2dArray
  | Positon3dArray;

export enum ViewState {
  Map = "map",
  Edit = "edit"
}

export class State {
  zoom: number;
  center: Array<number>;
  bbox: BBox;
  extent: Extent;
  scale: number;
  bounds: Bounds;
  mousePosition: Positon;
  viewState: ViewState;
}

export let defaultZoom = 0;
export let defaultCenter = [0, 0];
export let defaultBbox: BBox = [-180, 90, 180, -90];
export let defaultExtent: Extent = [-180, 90, 180, -90];
export let defaultScale = 0;
export let defaultBounds = new Bounds();
export let defaultPosition: [number, number, number] = [0, 0, 0];
export let defaultViewState = ViewState.Map;

export let defaultMapState: State = {
  zoom: defaultZoom,
  center: defaultCenter,
  bbox: defaultBbox,
  extent: defaultExtent,
  scale: defaultScale,
  bounds: defaultBounds,
  mousePosition: defaultPosition,
  viewState: defaultViewState
};

export interface MapMouseEvent {
  zoom(zoom: number): number;
  scale(scale : number) : number;
  /**
   * @description 返回当前地图鼠标移动的点位置
   */
  currentPosition(point: Positon): Positon;

  /**
   * @param event 这里的event和对应实现的地图引擎返回的e一致
   * @description 后面看看能不能针对mapv echarts的event进行处理，别忘记了
   */
  click(event: any);
}

/**
 * @function 发送鼠标位置
 * @param mousePosition
 * @return 触发对应的action行为，让model里面的mapstate的reduer函数响应
 */
export function toggleMousePosition(mousePosition: Positon) {
  return {
    type: NameSpaceMapState + "/mousePosition",
    payload: mousePosition
  };
}

/**
 * @function 发送当前级别
 * @param level
 * @return 触发对应的action行为，让model里面的mapstate的reduer函数响应
 */
export function toggleZoomLevel(zoom: number) {
  return {
    type: NameSpaceMapState + "/zoom",
    payload: zoom
  };
}

/**
 * @function 发送当前比例尺
 * @param scalse
 * @return 触发对应的action行为，让model里面的mapstate的reduer函数响应
 */
export function toggleScale(scale: number) {
  return {
    type: NameSpaceMapState + "/scale",
    payload: scale
  };
}
