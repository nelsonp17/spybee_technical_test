import { useProjectStore } from "@/store/projectStore";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const Pagination = () => {
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
    "text-gray-900 rounded-md shadow shadow-md bg-gray-200 hover:bg-gray-300 transition-colors disabled:hover:bg-gray-200";

  return (
    <div className="flex items-center justify-between px-4 py-3 sm:px-6">
      <div className="flex items-center">
        <p className="text-sm text-gray-800">
          Página {currentPage} de {totalPages}
        </p>
      </div>

      <div className="flex items-center space-x-2 text-sm font-medium">
        {/* Ir al inicio */}
        <button
          onClick={firstPage}
          disabled={currentPage === 1}
          className={`p-2 ${colorButton} disabled:opacity-30 disabled:cursor-not-allowed`}
        >
          <ChevronsLeft className="w-5 h-5" />
        </button>

        {/* Anterior */}
        <button
          onClick={previousPage}
          disabled={currentPage === 1}
          className={`flex items-center px-3 py-2 ${colorButton} disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Anterior
        </button>

        {/* Siguiente */}
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`flex items-center px-3 py-2 ${colorButton} disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          Siguiente
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>

        {/* Ir al final */}
        <button
          onClick={lastPage}
          disabled={currentPage === totalPages}
          className={`p-2 ${colorButton} disabled:opacity-30 disabled:cursor-not-allowed`}
        >
          <ChevronsRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
export default Pagination;
