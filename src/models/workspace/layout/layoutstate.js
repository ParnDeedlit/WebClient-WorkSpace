export default {
  namespace: "layoutstate",
  state: {
    left: true,
    right: false,
    bottom: false,
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
