import { getBackground, backgrouds } from "../../config/backgroud";
import {NameSpaceDocument} from '../../models/workspace';

export function toggleBackgroud(id: string) {
  return {
    type: NameSpaceDocument + "/changeBackgroud",
    payload: getBackground(id)
  };
}

export function toggleCurrent(current: any) {
  return {
    type: NameSpaceDocument + "/current",
    payload: current
  };
}
