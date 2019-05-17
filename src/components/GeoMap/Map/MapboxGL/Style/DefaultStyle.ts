export let DefaultStyle = {
  id: "empty",
  name: "empty",
  version: 8,
  sprite: "http://localhost:6163/igs/rest/mrms/vtiles/sprite",
  glyphs:
    "http://localhost:6163/igs/rest/mrms/vtiles/fonts/{fontstack}/{range}.pbf",
  metadata: {},
  sources: {
    empty: {
      type: "vector",
      tiles: [],
      minZoom: 0,
      maxZoom: 0
    }
  },
  layers: [
    {
      id: "dufaultempty",
      type: "background",
      layout: {
        visibility: "none"
      },
      paint: {
        "background-color": "rgba(247, 247, 247, 1)"
      }
    }
  ],
  path: "D:\\GIS\\Data\\VectorTile\\FileBase\\world"
};
