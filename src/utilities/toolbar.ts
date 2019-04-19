import { Current } from "./document";
import { LayerType } from "./layer";

export function isEnable(current: Current, supports: Array<LayerType>) {
  for (var i = 0; i < supports.length; i++) {
    let support = supports[i];
    if (support == current.type) return true;
  }
  return false;
}
