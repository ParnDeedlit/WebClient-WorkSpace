import backgrouds, { defaultBackground, getBackground } from "../config/backgroud";
import { NameSpaceDocument } from "../models/workspace";

import { LayerType, ILayer, BackGround } from "./layer";

export class Current {
  id: string;
  type: LayerType;
}

export const defaultCurrent = {
  id: LayerType.UnKnow,
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
  constructor(current: Current, backgrounds: Array<BackGround>, layers: Array<ILayer>) {
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

  setCurrent(id: string, type: LayerType) {
    let current = {
      id: id,
      type: type
    };
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
 * @param currnet
 * @return 触发对应的action行为，让model里面的document的reduer函数响应
 */
export function toggleCurrent(current: Current) {
  return {
    type: NameSpaceDocument + "/current",
    payload: current
  };
}

export default IDocument;
