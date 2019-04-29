import { Current } from "./map/document";
import { LayerType } from "./map/layer";

export function isEnable(current: Current, supports: Array<LayerType>) {
  for (var i = 0; i < supports.length; i++) {
    let support = supports[i];
    if (support == current.type) return true;
  }
  return false;
}
