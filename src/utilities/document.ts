import { defaultBackground } from "../config/backgroud";
import { LayerType, ILayer } from "./layer";

export class Current {
  id: string;
  type: LayerType;
}

export const defaultCurrent = {
  id: LayerType.UnKnow,
  type: LayerType.UnKnow
};

export class BackGround {
  title: string;
  name: string;
  id: string;
  tileUrl: string;
  imgUrl: string;
}

export class Document {
  current: Current; //实例属性
  background: BackGround; //实例属性
  layers: Array<ILayer>;

  //构造函数
  constructor(current: Current, background: BackGround, layers: Array<ILayer>) {
    this.current = current;
    this.background = background;
    this.layers = layers;
  }

  //实例方法
  getBackgroud(document) {
    if (!document) return defaultBackground;
    if (!document.backgroud) return defaultBackground;
    return document.backgroud;
  }

  getCurrent(document) {
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

export default Document;
