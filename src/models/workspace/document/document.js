import { NameSpaceDocument } from "../index";

import {
  defaultCurrent,
  defaultBacks,
  defaultLayers
} from "../../../utilities/document";

export default {
  namespace: NameSpaceDocument,
  state: {
    current: defaultCurrent,
    backgrounds: defaultBacks,
    layers: defaultLayers
  },
  reducers: {
    current(state,{ payload: current }) {
      var newState = { ...state, current };
      return newState;
    },
    changeBackgroud(state, { payload: backgrounds }) {
      var newState = { ...state, backgrounds };
      return newState;
    },
    getLayers(state, { payload: layer }) {
      var newState = { ...state };
      return newState;
    }
  }
};
