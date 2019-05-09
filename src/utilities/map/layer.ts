import { NameSpaceDocument } from "../../models/workspace";
import IDocument from "./document";

export const defaultId: string = "unknow";

export enum LayerType {
  BackGround = "background",
  RasterTile = "rastertile",
  VectorTile = "vectortile",
  UnKnow = "unknow"
}

export class ILayer {
  type: LayerType;
  name: string;
  id: string;
  key: string;

  description?: string;
  visible?: boolean;

  /**
   * @member UI框架用来进行文字绑定的关键字与name一致即可
   */
  title?: string;

  /**
   * @member 地图url
   */
  url?: string;
  style?: IStyle;
  /**
   * @member 地图样式
   */
  mapstyle?: string;
  /**
   * @member 表示font图标，和iconfont强绑定
   */
  icon?: string;
}

export class IStyle {
  visible?: boolean;
}

export function changeLayerName(
  layer: ILayer,
  name: string,
  document: IDocument
) {
  let layers = document.layers;
  if (!layers) return undefined;

  layers.map(item => {
    if (item.name == layer.name) {
      item.title = item.name = name;
    }
  });

  return {
    type: NameSpaceDocument + "/changeLayerName",
    payload: layers
  };
}
