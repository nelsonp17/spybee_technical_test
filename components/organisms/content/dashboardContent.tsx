"use client";

import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import TableProject from "@/components/molecules/tableProject";
import Summary from "../summary/summary";
import ButtonFilter from "@/components/atoms/buttons/button_filter";
import { useViewStore } from "@/store/viewStore";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectData } from "@/types/project";
import { Toaster } from "react-hot-toast";
import { useToast } from "@/hooks/useToast";
import { useProjectStore } from "@/store/projectStore";

const DashboardContent = ({ data }: { data: ProjectData[] }) => {
  const { view } = useViewStore();
  const [openSummary, setOpenSummary] = useState(false);

  const { setProjects, allProjects } = useProjectStore();

  const { success, error } = useToast();

  useEffect(() => {
    // 1. Verificación básica
    if (!data || data.length === 0) {
      error("La data no está disponible");
      return;
    }

    // 2. Solo sincronizamos si hay una diferencia real
    // Comparamos el primer ID o el length para evitar el bucle infinito
    const isDifferent =
      allProjects.length !== data.length ||
      (allProjects.length > 0 && allProjects[0]._id !== data[0]._id);

    if (isDifferent) {
      setProjects(data);
      success("Los datos han sido cargados exitosamente");
      console.log("Data sincronizada");
    }
  }, [data, setProjects, allProjects, success, error]);

  return (
    <>
      {/* container del toast de React-hot-toast */}
      <Toaster />

      <div className="flex flex-col lg:flex-row min-h-screen gap-4 p-4">
        {/* Sección de la Tabla */}
        <section
          className={`transition-all duration-300 ease-in-out ${
            openSummary ? "w-full lg:w-8/12" : "w-full lg:w-[98%]"
          }`}
        >
          <AnimatePresence mode="wait">
            {view === "map" && (
              <motion.div
                key="map-view"
                initial={{ opacity: 0, y: 20 }} // Estado inicial
                animate={{ opacity: 1, y: 0 }} // Estado al aparecer
                exit={{ opacity: 0, y: -20 }} // Estado al desaparecer
                transition={{ duration: 0.3 }}
                className="mb-8 w-full h-72 border border-yellow-950 bg-white"
              >
                <div className="py-14 text-center">MAP</div>
              </motion.div>
            )}
          </AnimatePresence>

          <TableProject openSummary={openSummary} />
        </section>

        {/* Sección del Resumen / Lateral */}
        <section
          className={`transition-all duration-300 ease-in-out flex flex-col items-center ${
            openSummary ? "w-full lg:w-4/12" : "w-full lg:w-[2%]"
          }`}
        >
          {openSummary ? (
            <div className="w-full">
              {/* Botón opcional para cerrar el summary si quieres que sea reversible */}
              <Summary onCloseSummary={() => setOpenSummary(false)} />
            </div>
          ) : (
            <ButtonFilter
              onClick={() => setOpenSummary(true)}
              className="rounded-full shadow-md bg-white border border-gray-200 lg:mt-4"
            >
              <ChevronLeft size={20} />
            </ButtonFilter>
          )}
        </section>
      </div>
    </>
  );
};

export default DashboardContent;
