import { NameSpaceMapState } from "../index";
import { defaultMapState } from "../../../utilities/map";

export default {
  namespace: NameSpaceMapState,
  state: {
    ...defaultMapState,
    selectedLayerIndex: 0,
    selectedLayer: {}
  },
  reducers: {
    zoom(state, { payload: zoom }) {
      var newState = { ...state, zoom };
      return newState;
    },
    scale(state, { payload: scale }) {
      var newState = { ...state, scale };
      return newState;
    },
    mousePosition(state, { payload: mousePosition }) {
      var newState = { ...state, mousePosition };
      return newState;
    },
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
