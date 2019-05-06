import backgrouds, {
  defaultBackground,
  getBackground
} from "../../config/backgroud";
import { NameSpaceDocument } from "../../models/workspace";

import { LayerType, ILayer, defaultId } from "./layer";
import { defaultRasterLayer } from "../../config/layers";
import { BackGroundLayer } from "./background";
import { RasterTileLayer } from "./rastertile";

export enum MapRender {
  MapBoxGL = "mapboxgl",
  Cesium = "cesium"
}

export class Current {
  id: string;
  type: LayerType;
  name?: string;
}

export const defaultCurrent = {
  id: defaultId,
  type: LayerType.UnKnow,
  name: defaultId
};

export const defaultName = "默认地图文档";

/**
 * @author 潘卓然
 * @description 通用地图文档接口
 */
export class IDocument {
  name: string;
  current: Current; //实例属性
  maprender: MapRender;
  backgrounds: Array<BackGroundLayer>; //实例属性
  layers: Array<ILayer>;
  before?: string; //表示堆顶图层

  //构造函数
  constructor(
    name: string,
    current: Current,
    backgrounds: Array<BackGroundLayer>,
    layers: Array<ILayer>,
    maprender?: MapRender
  ) {
    this.name = name ? name : defaultName;
    this.current = current ? current : defaultCurrent;
    this.backgrounds = backgrounds ? backgrounds : defaultBacks;
    this.layers = layers ? layers : defaultLayers;
    this.maprender = maprender ? maprender : MapRender.MapBoxGL;
  }

  //实例方法
  getBackgrouds() {
    return this.backgrounds;
  }

  getCurrent(document: IDocument) {
    if (!document) return defaultCurrent;
    if (!document.current) return defaultCurrent;
    return document.current;
  }

  getCurrentLayers() {
    if (this.current.type == LayerType.UnKnow) {
      return [defaultLayer];
    }
    if (this.current.type == LayerType.BackGround) {
      return this.backgrounds;
    }
    if (
      this.current.type == LayerType.VectorTile ||
      this.current.type == LayerType.RasterTile
    ) {
      return this.layers.filter(layer => {
        if (this.current.id == layer.id) {
          return true;
        }
      });
    }
    return [defaultLayer];
  }

  getCurrentLayer() {
    if (this.current.type == LayerType.UnKnow) {
      return defaultLayer;
    }
    if (this.current.type == LayerType.BackGround) {
      if (this.backgrounds && this.backgrounds.length >= 1)
        return this.backgrounds[0];
    }
    if (
      this.current.type == LayerType.VectorTile ||
      this.current.type == LayerType.RasterTile
    ) {
      const results = this.layers.filter(layer => {
        if (this.current.id == layer.id) {
          return true;
        }
      });
      if (results && results.length >= 1) return results[0];
    }
    return defaultLayer;
  }

  getCurrentStyle() {
    let layers = this.getCurrentLayers();
    if (layers && layers.length >= 1) {
      let layer = layers[0];
      switch (layer.type) {
        case LayerType.BackGround:
          if (layer instanceof BackGroundLayer) {
            return (<BackGroundLayer>layer).style;
          }
          break;
        case LayerType.RasterTile:
          if (layer instanceof RasterTileLayer) {
            return (<RasterTileLayer>layer).style;
          }
          break;
        case LayerType.VectorTile:
          break;
      }
    }
  }

  changeCurrent(id: string) {
    let current = defaultCurrent;

    for (var i = 0; i < this.backgrounds.length; i++) {
      let back = this.backgrounds[i];
      if (back.id == id) {
        current.id = back.id;
        current.type = LayerType.BackGround;
        current.name = back.name;
        return current;
      }
    }

    for (var i = 0; i < this.layers.length; i++) {
      let layer = this.layers[i];
      if (layer.id == id) {
        current.id = layer.id;
        current.type = layer.type;
        current.name = layer.name;
        return current;
      }
    }

    return current;
  }

  getLayers() {
    return this.layers;
  }

  getLayersByType(type: LayerType) {
    return this.layers.filter(layer => {
      return layer.type == type;
    });
  }

  getLayerById(id: string) {
    return this.layers.filter(layer => {
      return layer.id == id;
    });
  }

  //静态方法
  /* static hello() {} */
  //静态属性
  /* static PI: number = Math.PI; */
  //静态方法中可以返回静态属性，，静态成员只能使用类名.静态成员的方式进行访问。
  /* static area(r: number) {return Document.PI * r * r;} */
}

export const defaultMapRender: MapRender = MapRender.MapBoxGL;

export const defaultLayer: ILayer = {
  type: LayerType.UnKnow,
  name: LayerType.UnKnow,
  id: LayerType.UnKnow,
  key: LayerType.UnKnow
};

export const defaultBacks: Array<BackGroundLayer> = [
  {
    title: "浅色背景",
    name: "MapBox浅色背景",
    id: "mapboxlight",
    key: "mapboxlight",
    description: "MapboxGL提供的浅色背景图，版本是v4, WMTS服务",
    icon: "icon-background",
    type: LayerType.BackGround,
    visible: true,
    url: "",
    tileUrl:
      "https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=sk.eyJ1IjoiY2hlbmdkYWRhIiwiYSI6ImNqZDFjaGo0ZjFzcnoyeG54enoxdnNuZHUifQ.hTWXXBUQ0wdGeuDF3GWeUw",
    imgUrl:
      "https://user-images.githubusercontent.com/23654117/56859980-16e31c80-69c4-11e9-9e15-0980bd7ff947.png"
  }
];

export const defaultLayers: Array<ILayer> = [
  {
    type: LayerType.VectorTile,
    url: "http://localhost:6163/igs/rest/mrms/vtiles/styles/军测最终.json",
    mapstyle: "http://localhost:6163/igs/rest/mrms/vtiles/styles/军测最终.json",
    description: "军测矢量瓦片, WMTS服务",
    visible: true,
    name: "军测最终",
    title: "军测最终",
    id: "military",
    key: "military",
    icon: "icon-vector"
  }
].concat(defaultRasterLayer);

export const defaultDocument: IDocument = new IDocument(
  defaultName,
  defaultCurrent,
  defaultBacks,
  defaultLayers,
  MapRender.MapBoxGL
);

export function cloneDocument(document: IDocument): IDocument {
  let { name, current, backgrounds, layers, maprender } = document;
  let copy = new IDocument(name, current, backgrounds, layers, maprender);
  return copy;
}

/**
 * @function 改变底图背景
 * @param id
 * @return 触发对应的action行为，让model里面的document的reduer函数响应
 */
export function toggleBackgroud(id: string) {
  let backgrounds = [getBackground(id)];
  return {
    type: NameSpaceDocument + "/changeBackgroud",
    payload: backgrounds
  };
}

export function resetDocument(document: IDocument) {
  return {
    type: NameSpaceDocument + "/resetDocument",
    payload: document
  };
}

export function resetMapRender(maprender: MapRender) {
  return {
    type: NameSpaceDocument + "/maprender",
    payload: maprender
  };
}

/**
 * @function 改变当前选中
 * @param id 对应唯一的键值
 * @return 触发对应的action行为，让model里面的document的reduer函数响应
 */
export function toggleCurrent(id: string, document: IDocument) {
  let current: Current = document.changeCurrent(id);
  return {
    type: NameSpaceDocument + "/current",
    payload: current
  };
}

export default IDocument;
