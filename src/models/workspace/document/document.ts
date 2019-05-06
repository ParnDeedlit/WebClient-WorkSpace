import { NameSpaceDocument } from "../index";

import {
  defaultDocument,
  defaultCurrent,
  defaultMapRender,
  defaultBacks,
  defaultLayers
} from "../../../utilities/map/document";

export default {
  namespace: NameSpaceDocument,
  state: defaultDocument,
  reducers: {
    resetDocument(state, { payload: document }) {
      var newState = {
        name: document.name,
        maprender: document.maprender,
        current: defaultCurrent,
        backgrounds: document.backgrounds,
        layers: document.layers
      };
      return newState;
    },
    current(state, { payload: current }) {
      var newState = { ...state, current };
      return newState;
    },
    maprender(state, { payload: maprender }) {
      var newState = { ...state, maprender };
      return newState;
    },
    changeBackgroud(state, { payload: backgrounds }) {
      var newState = { ...state, backgrounds };
      return newState;
    },
    changeBackgroundStyle(state, { payload: backgrounds }) {
      var newState = { ...state, backgrounds };
      return newState;
    },
    changeRasterTileStyle(state, { payload: layers }) {
      var newState = { ...state, layers };
      return newState;
    }
  }
};
