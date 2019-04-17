export default {
  namespace: "mapstyle",
  state: {
    version: 8,
    name: "default style",
    metadata: {
      "mapbox:autocomposite": false,
      "mapbox:type": "template",
      "mapgis:renderer": "mbgljs",
    },
    sources: {},
    sprite: "http://localhost:6163/igs/rest/mrms/vtiles/sprite",
    glyphs: "http://localhost:6163/igs/rest/mrms/vtiles/fonts/{fontstack}/{range}.pbf",
    layers: [],
    id: "default"
  },
  reducers: {
    style(state, { payload: style }) {
      var newState = { ...state, style };
      return newState;
    }
  }
};
