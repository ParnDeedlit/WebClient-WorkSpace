import { ILayer } from "./layer";
import { NameSpaceDocument } from "../../models/workspace";

export class RasterTileLayer extends ILayer {
  title: string;
  tileUrl: string;
  imgUrl: string;
  style?: RasterTileStyle;
}

//-------------------------------------RasterTileStyle----------------------------------
//---------------------------------------栅格样式-开始-----------------------------------
//-------------------------------------RasterTileStyle----------------------------------
export class RasterTileStyle {
  visible: boolean;
  opacity: number;
  hue: number;

  constructor(visible: boolean, opacity: number, hue: number) {
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
  dispatchStyleChange(
    RasterTiles: Array<RasterTileLayer>,
    style: RasterTileStyle
  );
  onOpacityChange(opacity: number);
  onHueChange(hue: number);
}

export const defaultRasterTileStyle: RasterTileStyle = new RasterTileStyle(
  true,
  1,
  0
);

export function changeRasterTileStyle(
  RasterTiles: Array<RasterTileLayer>,
  style: RasterTileStyle
) {
  if (RasterTiles.length <= 0) return null;
  RasterTiles.map(rastertile => {
    rastertile.style = style;
  });

  return {
    type: NameSpaceDocument + "/changeRasterTileStyle",
    payload: RasterTiles
  };
}

//-------------------------------------RasterTileStyle----------------------------------
//---------------------------------------栅格样式-结束-----------------------------------
//-------------------------------------RasterTileStyle----------------------------------
