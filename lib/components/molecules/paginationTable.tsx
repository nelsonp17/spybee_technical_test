import { useProjectStore } from "@/lib/store/projectStore";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const PaginationTable = () => {
  const {
    currentPage,
    getTotalPages,
    nextPage,
    previousPage,
    firstPage,
    lastPage,
    filteredProjects,
  } = useProjectStore();

  const totalPages = getTotalPages();

  // No mostrar si no hay nada que paginar
  if (filteredProjects.length === 0) return null;

  const colorButton =
    "text-gray-900 rounded-md shadow-sm bg-gray-200 hover:bg-gray-300 transition-colors disabled:hover:bg-gray-200";

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-4 sm:px-6 bg-white border-t border-gray-100">
      {/* Contador de páginas */}
      <div className="flex items-center order-2 sm:order-1">
        <p className="text-xs sm:text-sm text-gray-500 font-medium">
          Mostrando página <span className="text-gray-900">{currentPage}</span>{" "}
          de <span className="text-gray-900">{totalPages}</span>
        </p>
      </div>

      {/* Controles de navegación */}
      <div className="flex items-center space-x-1.5 sm:space-x-2 text-sm font-medium order-1 sm:order-2">
        {/* Ir al inicio */}
        <button
          onClick={firstPage}
          disabled={currentPage === 1}
          className={`p-2 ${colorButton} disabled:opacity-30 disabled:cursor-not-allowed`}
          title="Primera página"
        >
          <ChevronsLeft className="w-5 h-5" />
        </button>

        {/* Anterior */}
        <button
          onClick={previousPage}
          disabled={currentPage === 1}
          className={`flex items-center px-2 py-2 sm:px-3 ${colorButton} disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <ChevronLeft className="w-4 h-4 sm:mr-1" />
          <span className="hidden sm:inline">Anterior</span>
        </button>

        {/* Siguiente */}
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`flex items-center px-2 py-2 sm:px-3 ${colorButton} disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <span className="hidden sm:inline">Siguiente</span>
          <ChevronRight className="w-4 h-4 sm:ml-1" />
        </button>

        {/* Ir al final */}
        <button
          onClick={lastPage}
          disabled={currentPage === totalPages}
          className={`p-2 ${colorButton} disabled:opacity-30 disabled:cursor-not-allowed`}
          title="Última página"
        >
          <ChevronsRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default PaginationTable;
