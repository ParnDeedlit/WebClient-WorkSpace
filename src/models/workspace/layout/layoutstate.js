import { NameSpaceLayoutState } from "../index";

export default {
  namespace: NameSpaceLayoutState,
  state: {
    left: true,
    right: false,
    bottom: false,
    toolbar: ["basic", "vectortile", "rastertile"],
  },
  reducers: {
    toggleLeftLayout(state) {
      var newState = { ...state };
      newState.left = !newState.left;
      return newState;
    },
    toggleRightLayout(state) {
      var newState = { ...state };
      newState.right = !newState.right;
      return newState;
    },
    toggleBottomLayout(state) {
      var newState = { ...state };
      newState.bottom = !newState.bottom;
      return newState;
    }
  }
};
