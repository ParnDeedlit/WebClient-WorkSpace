import { PropertyValueSpecification } from "@mapbox/mapbox-gl-style-spec/types";

export let defaultStops = {
  stops: []
};

export function parseCurrentNumber(current: PropertyValueSpecification<number>) {
  if (typeof current === "number") {
    this.defaultData[0].value = current;
    return this.defaultData;
  } else {
    if (!current.stops) return this.defaultData;
    return [].concat(current.stops.map((item, index) => {
      return { key: index, level: item[0], value: item[1] }
    }));
  }
}

export default defaultStops;
