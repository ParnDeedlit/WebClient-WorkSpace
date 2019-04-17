export let defaultBackground = {
  title: "黑色背景",
  name: "MapBox黑色背景",
  id: "mapboxdark",
  tileUrl:
    "https://api.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}.png?access_token=sk.eyJ1IjoiY2hlbmdkYWRhIiwiYSI6ImNqZDFjaGo0ZjFzcnoyeG54enoxdnNuZHUifQ.hTWXXBUQ0wdGeuDF3GWeUw",
  imgUrl:
    "https://www.arcgis.com/sharing/rest/content/items/bf024b8d0b4b48f5a486070214e87c5f/info/thumbnail/ago_downloaded.png?token=J2AaiNAlnstPvsJzidWbhWK2R4Tmq8nbd-FGwxlRjIHbNuHK4LzX5YLOUhHa7czJxP2X2XzObWfL__l_L6Ff_0EcOJmNcBzWf2NU6vX4Mn28lKikRg3RYkuwhUU0b_9ZnB-QBI6yTXi-CEg-waKgVoEZzs18ElFJr0KZP8854o_Il3stSyJMXBM21Dw51FEz"
};

export let backgrouds = [
  {
    title: "黑色背景",
    name: "MapBox黑色背景",
    id: "mapboxdark",
    tileUrl:
      "https://api.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}.png?access_token=sk.eyJ1IjoiY2hlbmdkYWRhIiwiYSI6ImNqZDFjaGo0ZjFzcnoyeG54enoxdnNuZHUifQ.hTWXXBUQ0wdGeuDF3GWeUw",
    imgUrl:
      "https://www.arcgis.com/sharing/rest/content/items/bf024b8d0b4b48f5a486070214e87c5f/info/thumbnail/ago_downloaded.png?token=J2AaiNAlnstPvsJzidWbhWK2R4Tmq8nbd-FGwxlRjIHbNuHK4LzX5YLOUhHa7czJxP2X2XzObWfL__l_L6Ff_0EcOJmNcBzWf2NU6vX4Mn28lKikRg3RYkuwhUU0b_9ZnB-QBI6yTXi-CEg-waKgVoEZzs18ElFJr0KZP8854o_Il3stSyJMXBM21Dw51FEz"
  },
  {
    title: "浅色背景",
    name: "MapBox浅色背景",
    id: "mapboxlight",
    tileUrl:
      "https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=sk.eyJ1IjoiY2hlbmdkYWRhIiwiYSI6ImNqZDFjaGo0ZjFzcnoyeG54enoxdnNuZHUifQ.hTWXXBUQ0wdGeuDF3GWeUw",
    imgUrl:
      "https://www.arcgis.com/sharing/rest/content/items/23fe7e8317ba4331b6ca72bf2a8eddb6/info/thumbnail/_E5_BE_AE_E5_8D_9A_E6_A1_8C_E9_9D_A2_E6_88_AA_E5_9B_BE_20130828171658.jpg?token=J2AaiNAlnstPvsJzidWbhWK2R4Tmq8nbd-FGwxlRjIHbNuHK4LzX5YLOUhHa7czJxP2X2XzObWfL__l_L6Ff_0EcOJmNcBzWf2NU6vX4Mn28lKikRg3RYkuwhUU0b_9ZnB-QBI6yTXi-CEg-waKgVoEZzs18ElFJr0KZP8854o_Il3stSyJMXBM21Dw51FEz"
  },
  {
    title: "街道地图",
    name: "MapBox街道地图",
    id: "mapboxstreets",
    tileUrl:
      "https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=sk.eyJ1IjoiY2hlbmdkYWRhIiwiYSI6ImNqZDFjaGo0ZjFzcnoyeG54enoxdnNuZHUifQ.hTWXXBUQ0wdGeuDF3GWeUw",
    imgUrl:
      "https://www.arcgis.com/sharing/rest/content/items/017a6ec857ec4150a1f6d51e74d755bb/info/thumbnail/ago_downloaded.png?token=J2AaiNAlnstPvsJzidWbhWK2R4Tmq8nbd-FGwxlRjIHbNuHK4LzX5YLOUhHa7czJxP2X2XzObWfL__l_L6Ff_0EcOJmNcBzWf2NU6vX4Mn28lKikRg3RYkuwhUU0b_9ZnB-QBI6yTXi-CEg-waKgVoEZzs18ElFJr0KZP8854o_Il3stSyJMXBM21Dw51FEz"
  },
  {
    title: "高德地图",
    name: "高德地图",
    id: "gaode",
    tileUrl:
      "https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=sk.eyJ1IjoiY2hlbmdkYWRhIiwiYSI6ImNqZDFjaGo0ZjFzcnoyeG54enoxdnNuZHUifQ.hTWXXBUQ0wdGeuDF3GWeUw",
    imgUrl:
      "https://www.arcgis.com/sharing/rest/content/items/017a6ec857ec4150a1f6d51e74d755bb/info/thumbnail/ago_downloaded.png?token=J2AaiNAlnstPvsJzidWbhWK2R4Tmq8nbd-FGwxlRjIHbNuHK4LzX5YLOUhHa7czJxP2X2XzObWfL__l_L6Ff_0EcOJmNcBzWf2NU6vX4Mn28lKikRg3RYkuwhUU0b_9ZnB-QBI6yTXi-CEg-waKgVoEZzs18ElFJr0KZP8854o_Il3stSyJMXBM21Dw51FEz"
  }
];

export function getBackground(id: string) {
  if (backgrouds.length <= 0) return defaultBackground;
  for (var i = 0; i < backgrouds.length; i++) {
    if (backgrouds[i].id == id) {
      return backgrouds[i];
    }
  }
  return defaultBackground;
}

export default backgrouds;
