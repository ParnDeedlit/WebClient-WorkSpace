import backgrouds, {
  defaultBackground,
  getBackground
} from "../config/backgroud";
import { NameSpaceDocument } from "../models/workspace";

import { LayerType, ILayer, BackGround, defaultId } from "./layer";

export class Current {
  id: string;
  type: LayerType;
}

export const defaultCurrent = {
  id: defaultId,
  type: LayerType.UnKnow
};

/**
 * @author 潘卓然
 * @description 通用地图文档接口
 */
export class IDocument {
  current: Current; //实例属性
  backgrounds: Array<BackGround>; //实例属性
  layers: Array<ILayer>;

  //构造函数
  constructor(
    current: Current,
    backgrounds: Array<BackGround>,
    layers: Array<ILayer>
  ) {
    this.current = current;
    this.backgrounds = backgrounds;
    this.layers = layers;
  }

  //实例方法
  getBackgrouds(document: IDocument) {
    if (!document) return defaultBackground;
    if (!document.backgrounds) return defaultBackground;
    return document.backgrounds;
  }

  getCurrent(document: IDocument) {
    if (!document) return defaultCurrent;
    if (!document.current) return defaultCurrent;
    return document.current;
  }

  changeCurrent(id: string) {
    let current = defaultCurrent;

    for (var i = 0; i < this.backgrounds.length; i++) {
      let back = this.backgrounds[i];
      if (back.id == id) {
        current.id = back.id;
        current.type = LayerType.BackGround;
        return current;
      }
    }

    for (var i = 0; i < this.layers.length; i++) {
      let layer = this.layers[i];
      if (layer.id == id) {
        current.id = layer.id;
        current.type = layer.type;
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

export const defaultBacks: Array<BackGround> = [
  {
    title: "浅色背景",
    name: "MapBox浅色背景",
    id: "mapboxlight",
    key: "mapboxlight",
    icon: "icon-background",
    type: LayerType.BackGround,
    url: "",
    tileUrl:
      "https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=sk.eyJ1IjoiY2hlbmdkYWRhIiwiYSI6ImNqZDFjaGo0ZjFzcnoyeG54enoxdnNuZHUifQ.hTWXXBUQ0wdGeuDF3GWeUw",
    imgUrl:
      "https://www.arcgis.com/sharing/rest/content/items/23fe7e8317ba4331b6ca72bf2a8eddb6/info/thumbnail/_E5_BE_AE_E5_8D_9A_E6_A1_8C_E9_9D_A2_E6_88_AA_E5_9B_BE_20130828171658.jpg?token=J2AaiNAlnstPvsJzidWbhWK2R4Tmq8nbd-FGwxlRjIHbNuHK4LzX5YLOUhHa7czJxP2X2XzObWfL__l_L6Ff_0EcOJmNcBzWf2NU6vX4Mn28lKikRg3RYkuwhUU0b_9ZnB-QBI6yTXi-CEg-waKgVoEZzs18ElFJr0KZP8854o_Il3stSyJMXBM21Dw51FEz"
  }
];

export const defaultLayers: Array<ILayer> = [
  {
    type: LayerType.VectorTile,
    url: "http://localhost:6163/igs/rest/mrms/vtiles/styles/vectortile.json",
    mapstyle: "http://localhost:6163/igs/rest/mrms/vtiles/styles/vectortile.json",
    name: "地类图斑",
    title: "地类图斑",
    id: "hunan",
    key: "hunan",
    icon: "icon-vector"
  }
];
export const defaultDocument: IDocument = new IDocument(
  defaultCurrent,
  defaultBacks,
  defaultLayers
);

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
