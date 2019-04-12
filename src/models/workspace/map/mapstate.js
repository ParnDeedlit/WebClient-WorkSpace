export default {
  namespace: "mapstate",
  state: {
    selectedLayerIndex: 0,
    selectedLayer: {},
    viewState: "map",
    mapRect: []
  },
  reducers: {
    selectedLayerIndex(state, { payload: selectedLayerIndex }) {
      var newState = { ...state, selectedLayerIndex };
      return newState;
    },
    selectedLayer(state, { payload: selectedLayer }) {
      var newState = { ...state, selectedLayer };
      return newState;
    }
  }
};
