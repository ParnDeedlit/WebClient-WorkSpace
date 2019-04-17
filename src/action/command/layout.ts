export function toggleLeftLayout(toggle: Boolean) {
  return {
    type: "layoutstate/toggleLeftLayout"
    //payload: toggle
  };
}

export function toggleRightLayout(toggle: Boolean) {
  return {
    type: "layoutstate/toggleRightLayout"
    //payload: toggle
  };
}

export function toggleBottomLayout(toggle: Boolean) {
  return {
    type: "layoutstate/toggleBottomLayout"
    //payload: toggle
  };
}
