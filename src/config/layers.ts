import { LayerType } from "../utilities/map/layer";

export const defaultRasterLayer = [
  {
    type: LayerType.RasterTile,
    url: "http://localhost:6163/igs/rest/mrms/tile/省级行政区/{z}/{y}/{x}",
    mapstyle: "",
    description: "省级行政区",
    visible: true,
    name: "省级行政区",
    title: "省级行政区",
    id: "province",
    key: "province",
    icon: "icon-raster_tile"
  },
  {
    type: LayerType.RasterTile,
    url: "http://localhost:6163/igs/rest/mrms/tile/中国地级市/{z}/{y}/{x}",
    mapstyle: "",
    description: "中国地级市",
    visible: true,
    name: "中国地级市",
    title: "中国地级市",
    id: "shi",
    key: "shi",
    icon: "icon-raster_tile"
  },
  {
    type: LayerType.RasterTile,
    url: "http://localhost:6163/igs/rest/mrms/tile/中国地级县/{z}/{y}/{x}",
    mapstyle: "",
    description: "中国地级县",
    visible: true,
    name: "中国地级县",
    title: "中国地级县",
    id: "xian",
    key: "xian",
    icon: "icon-raster_tile"
  }
];
