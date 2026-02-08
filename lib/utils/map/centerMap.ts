import { Map } from "mapbox-gl";

export const centerMap = (map: Map, coords: [number, number], zoom: number) => {
  map.flyTo({
    center: coords,
    zoom: zoom,
    essential: true,
  });
};
