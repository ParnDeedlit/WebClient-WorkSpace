export default {
  namespace: "mapstyle",
  state: {
      version: 8,
      name: "地类图斑墨卡托 Style",
      metadata: {
        "mapbox:autocomposite": false,
        "mapbox:type": "template",
        "maputnik:renderer": "mbgljs",
        "openmaptiles:version": "3.x"
      },
      sources: {
        地类图斑墨卡托: {
          type: "vector",
          tiles: [
            "http://localhost:6163/igs/rest/mrms/tile/湖南数据/{z}/{y}/{x}?type=cpbf&returnError=false"
          ],
          minZoom: 0,
          maxZoom: 15
        },
        栅格底图: {
          type: "raster",
          tiles: [
            "https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=sk.eyJ1IjoiY2hlbmdkYWRhIiwiYSI6ImNqZDFjaGo0ZjFzcnoyeG54enoxdnNuZHUifQ.hTWXXBUQ0wdGeuDF3GWeUw"
          ],
          minzoom: 0,
          maxzoom: 16
        }
      },
      sprite: "http://localhost:6163/igs/rest/mrms/vtiles/sprite",
      glyphs:
        "http://localhost:6163/igs/rest/mrms/vtiles/fonts/{fontstack}/{range}.pbf",
      layers: [
        {
          id: "背景",
          type: "background",
          layout: { visibility: "visible" },
          paint: { "background-color": "rgba(247, 247, 247, 1)" }
        },
        { id: "栅格底图", type: "raster", source: "栅格底图" },
        {
          id: "水田",
          type: "fill",
          source: "地类图斑墨卡托",
          "source-layer": "地类图斑墨卡托",
          filter: [
            "any",
            ["==", "地类名称", "水田"],
            ["==", "地类编码", "011"]
          ],
          layout: { visibility: "visible" },
          paint: { "fill-color": "rgba(255, 255, 100, 1)" }
        },
        {
          id: "旱地",
          type: "fill",
          source: "地类图斑墨卡托",
          "source-layer": "地类图斑墨卡托",
          filter: [
            "any",
            ["==", "地类名称", "旱地"],
            ["==", "地类编码", "013"]
          ],
          layout: { visibility: "visible" },
          paint: { "fill-color": "rgba(255, 255, 200, 1)" }
        },
        {
          id: "果园",
          type: "fill",
          source: "地类图斑墨卡托",
          "source-layer": "地类图斑墨卡托",
          filter: [
            "any",
            ["==", "地类名称", "果园"],
            ["==", "地类编码", "021"]
          ],
          layout: { visibility: "visible" },
          paint: { "fill-color": "rgba(245, 210, 40, 1)" }
        },
        {
          id: "茶园",
          type: "fill",
          source: "地类图斑墨卡托",
          "source-layer": "地类图斑墨卡托",
          filter: [
            "any",
            ["==", "地类名称", "茶园"],
            ["==", "地类编码", "022"]
          ],
          layout: { visibility: "visible" },
          paint: { "fill-color": "rgba(255, 200, 80, 1)" }
        },
        {
          id: "其他园地",
          type: "fill",
          source: "地类图斑墨卡托",
          "source-layer": "地类图斑墨卡托",
          filter: [
            "any",
            ["==", "地类名称", "其他园地"],
            ["==", "地类编码", "023"]
          ],
          layout: { visibility: "visible" },
          paint: { "fill-color": "rgba(250, 185, 20, 1)" }
        },
        {
          id: "有林地",
          type: "fill",
          source: "地类图斑墨卡托",
          "source-layer": "地类图斑墨卡托",
          filter: [
            "any",
            ["==", "地类名称", "有林地"],
            ["==", "地类编码", "031"]
          ],
          layout: { visibility: "visible" },
          paint: { "fill-color": "rgba(40, 140, 0, 1)" }
        },
        {
          id: "灌木林地",
          type: "fill",
          source: "地类图斑墨卡托",
          "source-layer": "地类图斑墨卡托",
          filter: [
            "any",
            ["==", "地类名称", "灌木林地"],
            ["==", "地类编码", "032"]
          ],
          layout: { visibility: "visible" },
          paint: { "fill-color": "rgba(85, 185, 100, 1)" }
        },
        {
          id: "其他林地",
          type: "fill",
          source: "地类图斑墨卡托",
          "source-layer": "地类图斑墨卡托",
          filter: [
            "any",
            ["==", "地类名称", "其他林地"],
            ["==", "地类编码", "033"]
          ],
          layout: { visibility: "visible" },
          paint: { "fill-color": "rgba(140, 215, 130, 1)" }
        },
        {
          id: "其他草地",
          type: "fill",
          source: "地类图斑墨卡托",
          "source-layer": "地类图斑墨卡托",
          filter: [
            "any",
            ["==", "地类名称", "其他草地"],
            ["==", "地类编码", "043"]
          ],
          layout: { visibility: "visible" },
          paint: { "fill-color": "rgba(200, 220, 100, 1)" }
        },
        {
          id: "铁路用地",
          type: "fill",
          source: "地类图斑墨卡托",
          "source-layer": "地类图斑墨卡托",
          filter: [
            "any",
            ["==", "地类名称", "铁路用地"],
            ["==", "地类编码", "101"]
          ],
          layout: { visibility: "visible" },
          paint: { "fill-color": "rgba(178, 170, 176, 1)" }
        },
        {
          id: "公路用地",
          type: "fill",
          source: "地类图斑墨卡托",
          "source-layer": "地类图斑墨卡托",
          filter: [
            "any",
            ["==", "地类名称", "公路用地"],
            ["==", "地类编码", "102"]
          ],
          layout: { visibility: "visible" },
          paint: { "fill-color": "rgba(170, 85, 80, 1)" }
        },
        {
          id: "农村道路",
          type: "fill",
          source: "地类图斑墨卡托",
          "source-layer": "地类图斑墨卡托",
          filter: [
            "any",
            ["==", "地类名称", "农村道路"],
            ["==", "地类编码", "104"]
          ],
          layout: { visibility: "visible" },
          paint: { "fill-color": "rgba(170, 85, 80, 1)" }
        },
        {
          id: "河流水面",
          type: "fill",
          source: "地类图斑墨卡托",
          "source-layer": "地类图斑墨卡托",
          filter: [
            "any",
            ["==", "地类名称", "河流水面"],
            ["==", "地类编码", "111"]
          ],
          layout: { visibility: "visible" },
          paint: { "fill-color": "rgba(150, 240, 255, 1)" }
        },
        {
          id: "水库水面",
          type: "fill",
          source: "地类图斑墨卡托",
          "source-layer": "地类图斑墨卡托",
          filter: [
            "any",
            ["==", "地类名称", "水库水面"],
            ["==", "地类编码", "113"]
          ],
          layout: { visibility: "visible" },
          paint: { "fill-color": "rgba(150, 240, 255, 1)" }
        },
        {
          id: "坑塘水面",
          type: "fill",
          source: "地类图斑墨卡托",
          "source-layer": "地类图斑墨卡托",
          filter: [
            "any",
            ["==", "地类名称", "坑塘水面"],
            ["==", "地类编码", "114"]
          ],
          layout: { visibility: "visible" },
          paint: { "fill-color": "rgba(160, 205, 240, 1)" }
        },
        {
          id: "内陆滩涂",
          type: "fill",
          source: "地类图斑墨卡托",
          "source-layer": "地类图斑墨卡托",
          filter: [
            "any",
            ["==", "地类名称", "内陆滩涂"],
            ["==", "地类编码", "116"]
          ],
          layout: { visibility: "visible" },
          paint: { "fill-color": "rgba(215, 255, 255, 1)" }
        },
        {
          id: "沟渠",
          type: "fill",
          source: "地类图斑墨卡托",
          "source-layer": "地类图斑墨卡托",
          filter: [
            "any",
            ["==", "地类名称", "沟渠"],
            ["==", "地类编码", "117"]
          ],
          layout: { visibility: "visible" },
          paint: { "fill-color": "rgba(160, 205, 240, 1)" }
        },
        {
          id: "水工建筑用地",
          type: "fill",
          source: "地类图斑墨卡托",
          "source-layer": "地类图斑墨卡托",
          filter: [
            "any",
            ["==", "地类名称", "水工建筑用地"],
            ["==", "地类编码", "118"]
          ],
          layout: { visibility: "visible" },
          paint: { "fill-color": "rgba(230, 130, 100, 1)" }
        },
        {
          id: "设施农用地",
          type: "fill",
          source: "地类图斑墨卡托",
          "source-layer": "地类图斑墨卡托",
          filter: [
            "any",
            ["==", "地类名称", "设施农用地"],
            ["==", "地类编码", "122"]
          ],
          layout: { visibility: "visible" },
          paint: { "fill-color": "rgba(220, 180, 130, 1)" }
        },
        {
          id: "裸地",
          type: "fill",
          source: "地类图斑墨卡托",
          "source-layer": "地类图斑墨卡托",
          filter: [
            "any",
            ["==", "地类名称", "裸地"],
            ["==", "地类编码", "127"]
          ],
          layout: { visibility: "visible" },
          paint: { "fill-color": "rgba(215, 200, 185, 1)" }
        },
        {
          id: "城市",
          type: "fill",
          source: "地类图斑墨卡托",
          "source-layer": "地类图斑墨卡托",
          filter: [
            "any",
            ["==", "地类名称", "城市"],
            ["==", "地类编码", "201"]
          ],
          layout: { visibility: "visible" },
          paint: { "fill-color": "rgba(220, 100, 120, 1)" }
        },
        {
          id: "建制镇",
          type: "fill",
          source: "地类图斑墨卡托",
          "source-layer": "地类图斑墨卡托",
          filter: [
            "any",
            ["==", "地类名称", "建制镇"],
            ["==", "地类编码", "202"]
          ],
          layout: { visibility: "visible" },
          paint: { "fill-color": "rgba(220, 100, 120, 1)" }
        },
        {
          id: "村庄",
          type: "fill",
          source: "地类图斑墨卡托",
          "source-layer": "地类图斑墨卡托",
          filter: [
            "any",
            ["==", "地类名称", "村庄"],
            ["==", "地类编码", "203"]
          ],
          layout: { visibility: "visible" },
          paint: { "fill-color": "rgba(230, 140, 160, 1)" }
        },
        {
          id: "采矿用地",
          type: "fill",
          source: "地类图斑墨卡托",
          "source-layer": "地类图斑墨卡托",
          filter: [
            "any",
            ["==", "地类名称", "采矿用地"],
            ["==", "地类编码", "204"]
          ],
          layout: { visibility: "visible" },
          paint: { "fill-color": "rgba(230, 120, 130, 1)" }
        },
        {
          id: "风景名胜及特殊用地",
          type: "fill",
          source: "地类图斑墨卡托",
          "source-layer": "地类图斑墨卡托",
          filter: [
            "any",
            ["==", "地类名称", "风景名胜及特殊用地"],
            ["==", "地类编码", "205"]
          ],
          layout: { visibility: "visible" },
          paint: { "fill-color": "rgba(230, 120, 130, 1)" }
        },
        {
          id: "田坎",
          type: "fill",
          source: "地类图斑墨卡托",
          "source-layer": "地类图斑墨卡托",
          filter: ["any", ["==", "地类名称", "田坎"]],
          layout: { visibility: "visible" },
          paint: { "fill-color": "rgba(220, 190, 132, 1)" }
        },
        {
          id: "沙地",
          type: "fill",
          source: "地类图斑墨卡托",
          "source-layer": "地类图斑墨卡托",
          filter: ["any", ["==", "地类名称", "沙地"]],
          layout: { visibility: "visible" },
          paint: { "fill-color": "rgba(220, 190, 132, 1)" }
        },
        {
          id: "沼泽地",
          type: "fill",
          source: "地类图斑墨卡托",
          "source-layer": "地类图斑墨卡托",
          filter: ["any", ["==", "地类名称", "沼泽地"]],
          layout: { visibility: "visible" },
          paint: { "fill-color": "rgba(182, 207, 255, 1)" }
        },
        {
          id: "港口码头用地",
          type: "fill",
          source: "地类图斑墨卡托",
          "source-layer": "地类图斑墨卡托",
          filter: ["any", ["==", "地类名称", "港口码头用地"]],
          layout: { visibility: "visible" },
          paint: { "fill-color": "rgba(0, 204, 255, 1)" }
        },
        {
          id: "水浇地",
          type: "fill",
          source: "地类图斑墨卡托",
          "source-layer": "地类图斑墨卡托",
          filter: ["any", ["==", "地类名称", "水浇地"]],
          layout: { visibility: "visible" },
          paint: { "fill-color": "rgba(128, 207, 232, 1)" }
        }
      ],
      fields: [
        "图斑面积",
        "线状地物面积",
        "零星地物面积",
        "图斑地类面积",
        "扣除地类面积",
        "扣除地类系数",
        "地类名称"
      ],
      displayfield: "地类名称",
      fieldrules: [
        {
          type: "statistic",
          items: ["扣除地类系数", "扣除地类面积"]
        },
        {
          type: "pie",
          items: [
            "线状地物面积",
            "零星地物面积",
            "图斑地类面积",
            "扣除地类面积"
          ]
        },
        {
          type: "waterfall",
          items: ["线状地物面积", "零星地物面积", "图斑地类面积", "图斑面积"]
        }
      ],
      id: "topology"
  },
  reducers: {
    style(state, { payload: style }) {
      var newState = { ...state, style };
      return newState;
    }
  }
};
