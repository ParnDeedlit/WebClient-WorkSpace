import { NameSpaceCommand } from "../index";

export default {
  namespace: NameSpaceCommand,
  state: {
    toggleProject: false,
    toggleTransform: false,
    toggleImport: false,
    toggleExport: false
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
    },
    toggleImport(state, { payload: toggleImport }) {
      var newState = { ...state, toggleImport };
      return newState;
    },
    toggleExport(state, { payload: toggleExport }) {
      var newState = { ...state, toggleExport };
      return newState;
    }
  }
};
