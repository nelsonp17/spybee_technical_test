import { Map, Popup, GeoJSONSource } from "mapbox-gl";
import { FeatureCollection, Geometry } from "geojson";
import { ProjectData } from "@/lib/types/server/project";

export const setupProjectLayer = (map: Map, allProjects: ProjectData[]) => {
  // SISTEMA DE PUNTOS
  // 1. Definimos el objeto con el tipo FeatureCollection de GeoJSON
  const geojsonPoints: FeatureCollection<Geometry> = {
    type: "FeatureCollection",
    features: allProjects.map((project) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [project.position.lng, project.position.lat],
      },
      properties: {
        id: project._id,
        title: project.title,
      },
    })),
  };

  const sourceId = "cien-puntos";
  const layerId = "capa-puntos";

  // 2. Lógica de renderizado/actualización
  const source = map.getSource(sourceId) as GeoJSONSource;

  if (!source) {
    // Si la fuente no existe, la creamos
    map.addSource(sourceId, {
      type: "geojson",
      data: geojsonPoints, // Ahora es perfectamente compatible sin 'any'
    });

    map.addLayer({
      id: layerId,
      type: "circle",
      source: sourceId,
      paint: {
        "circle-radius": 6,
        "circle-color": "#ffdf20",
        "circle-stroke-color": "#000",
        "circle-stroke-width": 1,
      },
    });

    // CODIGO PARA VER DETALLES DEL PROYECTO
    // 1. Detectar el clic en la capa
    map.on("click", layerId, (e) => {
      if (!e.features || e.features.length === 0) return;

      const feature = e.features[0];
      const geometry = feature.geometry as GeoJSON.Point;
      const coordinates = geometry.coordinates.slice() as [number, number];

      const title = feature.properties?.title || "Proyecto sin título";
      const id = feature.properties?.id || "";

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      new Popup({ offset: 10, closeButton: false })
        .setLngLat(coordinates)
        .setHTML(
          `
          <div style="padding: 2px;">
            <strong style="color: #1a1a1a;">${title}</strong>
            <p style="margin: 2px 0 0; font-size: 10px; color: #666;">ID: ${id}</p>
          </div>
        `,
        )
        .addTo(map);
    });

    // 2. Cambiar el cursor a 'pointer' (UX)
    map.on("mouseenter", layerId, () => {
      map.getCanvas().style.cursor = "pointer";
    });

    // 3. Volver el cursor a la normalidad
    map.on("mouseleave", layerId, () => {
      map.getCanvas().style.cursor = "";
    });
  } else {
    // Si ya existe, actualizamos los datos de forma eficiente
    source.setData(geojsonPoints);
  }
};
