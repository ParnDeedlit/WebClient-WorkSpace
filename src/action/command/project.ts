export function toggleProject(toggle: Boolean) {
  return {
    type: "commandproject/toggleProject",
    payload: toggle
  };
}

export function toggleTransform(toggle: Boolean) {
  return {
    type: "commandproject/toggleTransform",
    payload: toggle
  };
}
