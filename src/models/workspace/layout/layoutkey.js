import { NameSpaceLayoutKey } from "../index";
import {RightDefaultKey} from '../../../components/ConfigUI/RightPane';

export default {
  namespace: NameSpaceLayoutKey,
  state: {
    left: {

    },
    right: {
      activeKey: RightDefaultKey
    },
    bottom: {

    },
  },
  reducers: {
    toggleLeftKey(state) {
      var newState = { ...state };
      newState.left = !newState.left;
      return newState;
    },
    toggleRightKey(state) {
      var newState = { ...state };
      newState.right = !newState.right;
      return newState;
    },
    toggleBottomKey(state) {
      var newState = { ...state };
      newState.bottom = !newState.bottom;
      return newState;
    }
  }
};
