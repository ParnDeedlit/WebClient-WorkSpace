import { ILayer, LayerType, IStyle } from "./layer";
import { NameSpaceDocument } from "../../models/workspace";
import IDocument from "./document";
import { PropertyValueSpecification } from "@mapbox/mapbox-gl-style-spec/types";

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
  opacity?: PropertyValueSpecification<number>;
  hue?: PropertyValueSpecification<number>;

  constructor(
    visible: boolean,
    opacity: PropertyValueSpecification<number>,
    hue: PropertyValueSpecification<number>
  ) {
    super();
    this.visible = visible ? true : false;
    this.opacity = opacity ? opacity : 1;
    this.hue = hue ? hue : 0;
  }

  setOpacity(opacity: PropertyValueSpecification<number>) {
    this.opacity = opacity;
  }

  setHue(hue: PropertyValueSpecification<number>) {
    this.hue = hue;
  }
}

export interface IRasterTileSytle {
  dispatchStyleChange(layer: ILayer, style: RasterTileStyle, doc: IDocument);
  onOpacityChange(opacity: PropertyValueSpecification<number>);
  onHueChange(hue: PropertyValueSpecification<number>);
}

export const defaultOpacity: PropertyValueSpecification<number> = {
  stops: [[0, 1], [5, 1], [10, 1], [15, 1], [20, 1]]
};

export const defaultHue: PropertyValueSpecification<number> = {
  stops: [[0, 0]]
};

export const defaultRasterTileStyle: RasterTileStyle = new RasterTileStyle(
  true,
  defaultOpacity,
  defaultHue
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
