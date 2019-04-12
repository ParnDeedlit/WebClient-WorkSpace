export default {
  namespace: "mapoption",
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
