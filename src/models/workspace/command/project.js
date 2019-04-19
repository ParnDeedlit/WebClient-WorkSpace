import { NameSpaceCommand } from "../index";

export default {
  namespace: NameSpaceCommand,
  state: {
    toggleProject: false,
    toggleTransform: false
  },
  reducers: {
    toggleProject(state, { payload: toggleProject }) {
      var toggleTransform = false;
      var newState = { ...state, toggleProject, toggleTransform };
      return newState;
    },
    toggleTransform(state, { payload: toggleTransform }) {
      var toggleProject = false;
      var newState = { ...state, toggleTransform, toggleProject };
      return newState;
    }
  }
};
