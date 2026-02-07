/*
 Para configurar el mapa me basé en la documentación oficial de Mapbox GL JS y
 adapté el código para que funcione en mi aplicación.
 referencias:
 https://docs.mapbox.com/mapbox-gl-js/example/simple-map/
 https://docs.mapbox.com/help/tutorials/custom-markers-gl-js/
 https://docs.mapbox.com/mapbox-gl-js/example/center-on-feature/
*/

import { useMap } from "@/hooks/useMap";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRef } from "react";

const SectionMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  useMap(mapRef);

  return (
    <section className="flex items-center justify-center h-full text-gray-400 font-medium rounder-lg">
      {/* usamos ref en vez del id para usar mas de un mapa */}
      <div className="w-full h-full map" ref={mapRef}></div>
    </section>
  );
};

export default SectionMap;
