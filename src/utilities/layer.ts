export enum LayerType {
  BackGround = "background",
  RasterTile = "rastertile",
  VectorTile = "vectortile",
  UnKnow = "unknow"
}

export class ILayer {
  type: LayerType;
  url: string;
  key: string;
  name: string;
  id: string;
}


export class BackGround extends ILayer {
  tileUrl:string;
  imgUrl:string;
  icon: string;
}


export class RasterTileLayer extends ILayer {}

export class VectorTileLayer extends ILayer {
  style: string;
}
