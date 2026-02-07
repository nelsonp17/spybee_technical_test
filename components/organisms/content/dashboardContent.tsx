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
import SectionMap from "@/components/molecules/maps/sectionMap";

const DashboardContent = ({ data }: { data: ProjectData[] }) => {
  const { view } = useViewStore();
  const [openSummary, setOpenSummary] = useState(false);
  const { setProjects, allProjects } = useProjectStore();
  const { success, error } = useToast();

  useEffect(() => {
    if (!data || data.length === 0) {
      error("La data no está disponible");
      return;
    }

    const isDifferent =
      allProjects.length !== data.length ||
      (allProjects.length > 0 && allProjects[0]._id !== data[0]._id);

    if (isDifferent) {
      setProjects(data);
      success("Los datos han sido cargados exitosamente");
    }
  }, [data, setProjects, allProjects, success, error]);

  return (
    <>
      <Toaster />

      <div className="flex flex-col lg:flex-row min-h-screen gap-4 p-2 sm:p-4 relative overflow-hidden">
        {/* Sección de la Tabla */}
        <section
          className={`transition-all duration-500 ease-in-out w-full ${
            openSummary ? "lg:w-8/12" : "lg:w-[97%]"
          }`}
        >
          <AnimatePresence mode="wait">
            {view === "map" && (
              <motion.div
                key="map-view"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 288 }} // h-72
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-4 w-full border border-gray-200 bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <SectionMap />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pasamos el estado para que la tabla ajuste sus columnas internamente */}
          <TableProject openSummary={openSummary} />
        </section>

        {/* Sección del Resumen / Lateral */}
        {/* En móviles es un overlay, en LG es parte del layout flex */}
        <aside
          className={`
            fixed inset-y-0 right-0 z-50 w-full sm:w-[400px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out
            lg:relative lg:inset-auto lg:shadow-none lg:bg-transparent lg:translate-x-0
            ${openSummary ? "translate-x-0 lg:w-4/12" : "translate-x-full lg:w-[3%] lg:translate-x-0"}
          `}
        >
          {openSummary ? (
            <div className="h-full lg:h-auto overflow-y-auto">
              <Summary onCloseSummary={() => setOpenSummary(false)} />
            </div>
          ) : (
            <div className="hidden lg:flex flex-col items-center pt-4">
              <ButtonFilter
                onClick={() => setOpenSummary(true)}
                className="rounded-full shadow-md bg-white border border-gray-200 hover:bg-gray-50 transition-all group"
              >
                <ChevronLeft
                  size={20}
                  className="group-hover:scale-110 transition-transform"
                />
              </ButtonFilter>
            </div>
          )}
        </aside>

        {/* Overlay para móviles cuando el Summary está abierto */}
        <AnimatePresence>
          {openSummary && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenSummary(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            />
          )}
        </AnimatePresence>

        {/* Botón flotante para abrir Summary en móviles */}
        {!openSummary && (
          <button
            onClick={() => setOpenSummary(true)}
            className="lg:hidden fixed bottom-6 right-6 z-30 p-4 bg-yellow-500 rounded-full shadow-xl active:scale-95 transition-transform"
          >
            <ChevronLeft size={24} />
          </button>
        )}
      </div>
    </>
  );
};

export default DashboardContent;
