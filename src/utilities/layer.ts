import { NameSpaceDocument } from "../models/workspace";

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
  /**
   * @member 地图样式
   */
  mapstyle?: string;
  /**
   * @member 表示font图标，和iconfont强绑定
   */
  icon?: string;
}

export class BackGround extends ILayer {
  title: string;
  tileUrl: string;
  imgUrl: string;
  style?: BackGroundStyle;
}

export class RasterTileLayer extends ILayer {
  title: string;
  tileUrl: string;
  imgUrl: string;
}

export class VectorTileLayer extends ILayer {}

//-------------------------------------BackGroundStyle----------------------------------
//---------------------------------------背景样式-开始-----------------------------------
//-------------------------------------BackGroundStyle----------------------------------
export class BackGroundStyle {
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

export interface IBackGroundSytle {
  dispatchStyleChange(backgrounds: Array<BackGround>, style: BackGroundStyle);
  onOpacityChange(opacity: number);
  onHueChange(hue: number);
}

export const defaultBackGroundStyle: BackGroundStyle = new BackGroundStyle(true, 1, 0);

export function changeBackgroundStyle(
  backgrounds: Array<BackGround>,
  style: BackGroundStyle
) {
  if (backgrounds.length <= 0) return null;
  backgrounds.map(back => {
    back.style = style;
  });

  return {
    type: NameSpaceDocument + "/changeBackgroundStyle",
    payload: backgrounds
  };
}

//-------------------------------------BackGroundStyle----------------------------------
//---------------------------------------背景样式-结束-----------------------------------
//-------------------------------------BackGroundStyle----------------------------------
