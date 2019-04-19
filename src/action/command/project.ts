import { NameSpaceCommand } from "../../models/workspace";

export function toggleProject(toggle: Boolean) {
  return {
    type: NameSpaceCommand + "/toggleProject",
    payload: toggle
  };
}

export function toggleTransform(toggle: Boolean) {
  return {
    type: NameSpaceCommand + "/toggleTransform",
    payload: toggle
  };
}
