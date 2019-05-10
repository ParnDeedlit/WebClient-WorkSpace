import { ILayer, IStyle, ILayout } from "./layer";
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
export class BackGroundStyle extends IStyle {
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
  dispatchStyleChange(
    backgrounds: Array<BackGroundLayer>,
    style: BackGroundStyle
  );
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

//-------------------------------------RasterTileLayout----------------------------------
//---------------------------------------栅格布局-开始-----------------------------------
//-------------------------------------RasterTileLayout----------------------------------
export class BackGroundLayout extends ILayout {
  visible?: boolean;

  constructor(visible: boolean) {
    super();
    this.visible = visible;
  }

  setOpacity(visible: boolean) {
    this.visible = visible;
  }
}

export const defaultVisible: boolean = true;

export const defaultRasterTileLayout: BackGroundLayout = new BackGroundLayout(
  defaultVisible
);

export function changeBackgroundLayout(
  backgrounds: Array<BackGroundLayer>,
  layout: ILayout
) {
  if (backgrounds.length <= 0) return null;
  backgrounds.map(back => {
    back.layout = layout;
  });

  return {
    type: NameSpaceDocument + "/changeBackgroundLayout",
    payload: backgrounds
  };
}
//-------------------------------------RasterTileLayout----------------------------------
//---------------------------------------栅格布局-结束-----------------------------------
//-------------------------------------RasterTileLayout----------------------------------
