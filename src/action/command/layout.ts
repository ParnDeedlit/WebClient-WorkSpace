import { NameSpaceLayoutState } from "../../models/workspace";

export function toggleLeftLayout(toggle: Boolean) {
  return {
    type: NameSpaceLayoutState + "/toggleLeftLayout"
    //payload: toggle
  };
}

export function toggleRightLayout(toggle: Boolean) {
  return {
    type: NameSpaceLayoutState + "/toggleRightLayout"
    //payload: toggle
  };
}

export function toggleBottomLayout(toggle: Boolean) {
  return {
    type: NameSpaceLayoutState + "/toggleBottomLayout"
    //payload: toggle
  };
}
