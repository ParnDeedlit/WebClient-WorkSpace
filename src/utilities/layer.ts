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

export class BackGroundStyle {
  visible: boolean;
  opacity: number;
  hue: number;
}

export const defaultBackGroundStyle: BackGroundStyle = {
  visible: true,
  opacity: 1,
  hue: 0
};
