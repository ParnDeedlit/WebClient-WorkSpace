import { ILayer, LayerType, IStyle, ILayout } from "./layer";
import { NameSpaceDocument } from "../../models/workspace";
import IDocument from "./document";
import { PropertyValueSpecification } from "@mapbox/mapbox-gl-style-spec/types";

export class RasterTileLayer extends ILayer {
  title?: string;
  tileUrl?: string;
  imgUrl?: string;
  layout?: ILayout;
  style?: RasterTileStyle;
}

//-------------------------------------RasterTileStyle----------------------------------
//---------------------------------------栅格样式-开始-----------------------------------
//-------------------------------------RasterTileStyle----------------------------------
export class RasterTileStyle extends IStyle {
  opacity?: PropertyValueSpecification<number>;
  hue?: PropertyValueSpecification<number>;

  constructor(
    opacity: PropertyValueSpecification<number>,
    hue: PropertyValueSpecification<number>
  ) {
    super();
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

//-------------------------------------RasterTileLayout----------------------------------
//---------------------------------------栅格布局-开始-----------------------------------
//-------------------------------------RasterTileLayout----------------------------------
export class RasterTileLayout extends ILayout {
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

export const defaultRasterTileLayout: RasterTileLayout = new RasterTileLayout(
  defaultVisible
);

export function changeRasterTileLayout(
  raster: ILayer,
  layout: RasterTileLayout,
  document: IDocument
) {
  let layers = document.layers;
  if (!layers) return undefined;

  layers.map(layer => {
    if (layer.id == raster.id) {
      if (layer.type == LayerType.RasterTile) {
        layer.layout = layout;
      }
    }
  });

  return {
    type: NameSpaceDocument + "/changeRasterTileLayout",
    payload: layers
  };
}
//-------------------------------------RasterTileLayout----------------------------------
//---------------------------------------栅格布局-结束-----------------------------------
//-------------------------------------RasterTileLayout----------------------------------
