import { useEffect, useRef, useState } from "react";
import { Map } from "mapbox-gl";
import { initMap } from "@/utils/map/initMap";
import { useSelectionStore } from "@/store/selectionStore";
import { useProjectStore } from "@/store/projectStore";
import { centerMap } from "@/utils/map/centerMap";
import { setupProjectLayer } from "@/utils/map/setupProjectLayer";

export const useMap = (container: React.RefObject<HTMLDivElement | null>) => {
  const { selectedProjects } = useSelectionStore();
  const { allProjects } = useProjectStore();

  // Coordenadas iniciales del mapa (Colombia)
  const [coords] = useState<[number, number]>([-74.297333, 4.570868]);
  const zoomCoordInit = 6;
  const zoom = 11;
  const mapInitRef = useRef<Map | null>(null);

  // 1. Inicialización del mapa (Solo una vez)
  useEffect(() => {
    if (container.current) {
      mapInitRef.current = initMap(container.current, coords, zoomCoordInit);
    }

    // Limpieza al desmontar el componente
    return () => {
      mapInitRef.current?.remove();
      mapInitRef.current = null;
    };
  }, [container, coords]);

  // 2. Sincronización de Marcadores
  useEffect(() => {
    const map = mapInitRef.current;
    if (!map) return;

    const runSetup = () => setupProjectLayer(map, allProjects);

    if (map.isStyleLoaded()) {
      runSetup();
    } else {
      map.once("load", runSetup);
    }

    // Centrar el mapa si doy click en un proyecto
    if (selectedProjects.length > 0) {
      const lastProject = selectedProjects[selectedProjects.length - 1];
      if (lastProject.position) {
        centerMap(
          map,
          [lastProject.position.lng, lastProject.position.lat],
          zoom,
        );
      }
    }
  }, [selectedProjects, allProjects]);
};
