export enum LayerType {
  BackGround = "backgroud",
  RasterTile = "rastertile",
  VectorTile = "vectortile",
  UnKnow = "unknow"
}

export class ILayer {
  type: LayerType;
  url: string;
  style: string;
  name: string;
  id: string;
}

export class RasterTileLayer extends ILayer {}

export class VectorTileLayer extends ILayer {}
