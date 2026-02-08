import mapboxgl from "mapbox-gl";

const accessToken = process.env.NEXT_PUBLIC_TOKEN_MAPBOX;

export const initMap = (
  container: HTMLDivElement,
  coords: [number, number],
  zoom: number,
  styleMap: "dark-v10" | "streets-v12" | "satellite" = "streets-v12",
) => {
  const styles = {
    "dark-v10": "mapbox://styles/mapbox/dark-v10",
    "streets-v12": "mapbox://styles/mapbox/streets-v12",
    satellite: "mapbox://styles/mapbox/satellite-streets-v12",
  };

  mapboxgl.accessToken = accessToken;

  const map = new mapboxgl.Map({
    container: container, // container ID
    style: styles[styleMap],
    center: coords, // starting position [lng, lat]
    zoom: zoom, // starting zoom
    pitchWithRotate: false,
    doubleClickZoom: false,
  });

  return map;
};
