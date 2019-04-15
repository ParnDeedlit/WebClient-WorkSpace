export function toggleLeftLayout(toggle: Boolean) {
    return {
      type: "layoutstate/toggleLeftLayout",
      //payload: toggle
    };
  }
  
  export function toggleRightLayout(toggle: Boolean) {
    return {
      type: "layoutstate/toggleRightLayout",
      //payload: toggle
    };
  }
  