import { ILayer, LayerType, IStyle } from "./layer";
import { NameSpaceDocument } from "../../models/workspace";
import IDocument from "./document";

export class RasterTileLayer extends ILayer {
  title?: string;
  tileUrl?: string;
  imgUrl?: string;
  style?: RasterTileStyle;
}

//-------------------------------------RasterTileStyle----------------------------------
//---------------------------------------栅格样式-开始-----------------------------------
//-------------------------------------RasterTileStyle----------------------------------
export class RasterTileStyle extends IStyle {
  visible?: boolean;
  opacity?: number;
  hue?: number;

  constructor(visible: boolean, opacity: number, hue: number) {
    super();
    this.visible = visible ? true : false;
    this.opacity = opacity ? opacity : 1;
    this.hue = hue ? hue : 0;
  }

  setOpacity(opacity: number) {
    this.opacity = opacity;
  }

  setHue(hue: number) {
    this.hue = hue;
  }
}

export interface IRasterTileSytle {
  dispatchStyleChange(layer: ILayer, style: RasterTileStyle, doc: IDocument);
  onOpacityChange(opacity: number);
  onHueChange(hue: number);
}

export const defaultRasterTileStyle: RasterTileStyle = new RasterTileStyle(
  true,
  1,
  0
);

export function changeRasterTileStyle(
  raster: ILayer,
  style: any,
  document: IDocument
) {
  let layers = document.layers;
  if (!layers) return undefined;

  layers.map(layer => {
    if (layer.id == raster.id) {
      if (layer.type == LayerType.RasterTile) {
        layer.style = style;
      }
    }
  });

  return {
    type: NameSpaceDocument + "/changeRasterTileStyle",
    payload: layers
  };
}

//-------------------------------------RasterTileStyle----------------------------------
//---------------------------------------栅格样式-结束-----------------------------------
//-------------------------------------RasterTileStyle----------------------------------
