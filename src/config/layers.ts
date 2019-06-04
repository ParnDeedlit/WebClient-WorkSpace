import { LayerType, ILayer } from "../utilities/map/layer";
import { DemWMSLayer } from "../utilities/map/demwms";

export const defaultRasterLayer: Array<ILayer> = [
  {
    type: LayerType.RasterTile,
    url: "http://localhost:6163/igs/rest/mrms/tile/世界地图/{z}/{y}/{x}",
    description: "世界地图",
    name: "世界地图",
    title: "世界地图",
    id: "world",
    key: "world",
    icon: "icon-raster_tile"
  },
  {
    type: LayerType.RasterTile,
    url: "http://localhost:6163/igs/rest/mrms/tile/省级行政区/{z}/{y}/{x}",
    description: "省级行政区",
    name: "省级行政区",
    title: "省级行政区",
    id: "province",
    key: "province",
    icon: "icon-raster_tile"
  },
  {
    type: LayerType.RasterTile,
    url: "http://localhost:6163/igs/rest/mrms/tile/中国地级市/{z}/{y}/{x}",
    description: "中国地级市",
    name: "中国地级市",
    title: "中国地级市",
    id: "shi",
    key: "shi",
    icon: "icon-raster_tile"
  },
  {
    type: LayerType.RasterTile,
    url: "http://localhost:6163/igs/rest/mrms/tile/中国地级县/{z}/{y}/{x}",
    description: "中国地级县",
    name: "中国地级县",
    title: "中国地级县",
    id: "xian",
    key: "xian",
    icon: "icon-raster_tile"
  }
];
export const defaultVectorTileLayer: Array<ILayer> = [
  {
    type: LayerType.VectorTile,
    url: "http://localhost:6163/igs/rest/mrms/vtiles/styles/军测最终.json",
    mapstyle: "http://localhost:6163/igs/rest/mrms/vtiles/styles/军测最终.json",
    description: "军测矢量瓦片, WMTS服务",
    name: "军测最终",
    title: "军测最终",
    id: "military",
    key: "military",
    icon: "icon-vector"
  }
];
export const defaultDemWmsLayer: Array<DemWMSLayer> = [
  {
    type: LayerType.DemWMS,
    description: "军测矢量瓦片, WMTS服务",
    url: "http://localhost:8899/data/terrain/Westeros2_natural.jpg",
    info:{
      imgUrl: "https://alex2wong.github.io/Game-of-Throne-Map/assets/Westeros2_natural.jpg",
      heightImgUrl:
        "https://alex2wong.github.io/Game-of-Throne-Map/assets/height3.png",
    },
    name: "DEM-WMS",
    title: "DEM-WMS",
    id: "demwms-test",
    key: "demwms-test",
    icon: "icon-terrain"
  }
];
