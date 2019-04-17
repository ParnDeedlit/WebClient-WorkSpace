import { getBackground, backgrouds } from "../../config/backgroud";

export function toggleBackgroud(id: string) {
  return {
    type: "mapdocument/changeBackgroud",
    payload: getBackground(id)
  };
}
