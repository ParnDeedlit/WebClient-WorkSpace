export let defaultBackground = {
  title: "黑色背景",
  name: "MapBox黑色背景",
  id: "mapboxdark",
  key: "mapboxdark",
  icon: "icon-background",
  type: "background",
  tileUrl:
    "https://api.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}.png?access_token=sk.eyJ1IjoiY2hlbmdkYWRhIiwiYSI6ImNqZDFjaGo0ZjFzcnoyeG54enoxdnNuZHUifQ.hTWXXBUQ0wdGeuDF3GWeUw",
  imgUrl:
    "https://user-images.githubusercontent.com/23654117/56859979-16e31c80-69c4-11e9-9b5d-12d48eb85f0d.png"
};

export let backgrouds = [
  {
    title: "黑色背景",
    name: "MapBox黑色背景",
    id: "mapboxdark",
    key: "mapboxdark",
    icon: "icon-background",
    type: "background",
    tileUrl:
      "https://api.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}.png?access_token=sk.eyJ1IjoiY2hlbmdkYWRhIiwiYSI6ImNqZDFjaGo0ZjFzcnoyeG54enoxdnNuZHUifQ.hTWXXBUQ0wdGeuDF3GWeUw",
    imgUrl:
      "https://user-images.githubusercontent.com/23654117/56859978-164a8600-69c4-11e9-97bc-6bf8439483b0.png"
  },
  {
    title: "浅色背景",
    name: "MapBox浅色背景",
    id: "mapboxlight",
    key: "mapboxlight",
    icon: "icon-background",
    type: "background",
    tileUrl:
      "https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=sk.eyJ1IjoiY2hlbmdkYWRhIiwiYSI6ImNqZDFjaGo0ZjFzcnoyeG54enoxdnNuZHUifQ.hTWXXBUQ0wdGeuDF3GWeUw",
    imgUrl:
      "https://user-images.githubusercontent.com/23654117/56859979-16e31c80-69c4-11e9-9b5d-12d48eb85f0d.png"
  },
  {
    title: "街道地图",
    name: "MapBox街道地图",
    id: "mapboxstreets",
    key: "mapboxstreets",
    icon: "icon-background",
    type: "background",
    tileUrl:
      "https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=sk.eyJ1IjoiY2hlbmdkYWRhIiwiYSI6ImNqZDFjaGo0ZjFzcnoyeG54enoxdnNuZHUifQ.hTWXXBUQ0wdGeuDF3GWeUw",
    imgUrl:
      "https://user-images.githubusercontent.com/23654117/56859980-16e31c80-69c4-11e9-9e15-0980bd7ff947.png"
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
