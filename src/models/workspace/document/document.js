import { NameSpaceDocument } from "../index";

import {
  defaultCurrent,
  defaultBacks,
  defaultLayers
} from "../../../utilities/document";

export default {
  namespace: NameSpaceDocument,
  state: {
    name: "新地图文档",
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
    }
  }
};
