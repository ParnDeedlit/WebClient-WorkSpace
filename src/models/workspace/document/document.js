import { NameSpaceDocument } from "../index";

import {
  defaultCurrent,
  defaultMapRender,
  defaultBacks,
  defaultLayers
} from "../../../utilities/document";

export default {
  namespace: NameSpaceDocument,
  state: {
    name: "新地图文档",
    maprender: defaultMapRender,
    current: defaultCurrent,
    backgrounds: defaultBacks,
    layers: defaultLayers
  },
  reducers: {
    resetDocument(state, { payload: document }) {
      var newState = {
        name: document.name,
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
    }
  }
};
