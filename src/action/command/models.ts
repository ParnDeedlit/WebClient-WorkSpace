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

export function toggleImport(toggle: Boolean) {
  return {
    type: NameSpaceCommand + "/toggleImport",
    payload: toggle
  };
}

export function toggleExport(toggle: Boolean) {
  return {
    type: NameSpaceCommand + "/toggleExport",
    payload: toggle
  };
}
