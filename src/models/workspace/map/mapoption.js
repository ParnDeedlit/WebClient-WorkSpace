import { NameSpaceMapOption } from "../index";

export default {
  namespace: NameSpaceMapOption,
  state: {
    print: {}
  },
  reducers: {
    print(state, { payload: print }) {
      var newState = { ...state, print };
      return newState;
    }
  }
};
