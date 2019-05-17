import { NameSpaceDocument } from "../../models/workspace";
import IDocument from "./document";

export const defaultId: string = "unknow";

export enum LayerType {
  BackGround = "background",
  RasterTile = "rastertile",
  VectorTile = "vectortile",
  DemWMS = "demwms",
  UnKnow = "unknow"
}

export class ILayer {
  type: LayerType;
  name: string;
  id: string;
  key: string;

  description?: string;

  /**
   * @member UI框架用来进行文字绑定的关键字与name一致即可
   */
  title?: string;

  /**
   * @member 地图url
   */
  url?: string;
  layout?: ILayout;
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

export class IStyle {}

export class ILayout {
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

export function changeLayersVisible(
  visibleIds: Array<string>,
  document: IDocument
) {
  let layers = document.layers;
  if (!layers) return undefined;

  layers.forEach(layer => {
    if (!layer.layout) layer.layout = new ILayout();
    layer.layout.visible = false;
    visibleIds.forEach(id => {
      if (id == layer.id) {
        layer.layout.visible = true;
      }
    });
  });

  return {
    type: NameSpaceDocument + "/changeLayersVisible",
    payload: layers
  };
}
