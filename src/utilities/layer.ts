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

  /**
   * @member UI框架用来进行文字绑定的关键字与name一致即可
   */
  title? : string;

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
}

export class RasterTileLayer extends ILayer {}

export class VectorTileLayer extends ILayer {}
