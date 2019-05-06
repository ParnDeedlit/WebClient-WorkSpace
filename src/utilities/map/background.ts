import { ILayer, IStyle } from "./layer";
import { NameSpaceDocument } from "../../models/workspace";

export class BackGroundLayer extends ILayer {
  title: string;
  tileUrl: string;
  imgUrl: string;
  style?: BackGroundStyle;
}

//-------------------------------------BackGroundStyle----------------------------------
//---------------------------------------背景样式-开始-----------------------------------
//-------------------------------------BackGroundStyle----------------------------------
export class BackGroundStyle extends IStyle{
  visible: boolean;
  opacity: number;
  hue: number;

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

export interface IBackGroundSytle {
  dispatchStyleChange(backgrounds: Array<BackGroundLayer>, style: BackGroundStyle);
  onOpacityChange(opacity: number);
  onHueChange(hue: number);
}

export const defaultBackGroundStyle: BackGroundStyle = new BackGroundStyle(
  true,
  1,
  0
);

export function changeBackgroundStyle(
  backgrounds: Array<BackGroundLayer>,
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
