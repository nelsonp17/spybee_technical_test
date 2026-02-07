import { ProjectData } from "@/types/project";
import { SortProjects } from "@/types/ui/sortProjects";
import { create } from "zustand";

interface ProjectState {
  allProjects: ProjectData[]; // data original
  filteredProjects: ProjectData[]; // Resultado de la búsqueda
  pageProjects: ProjectData[]; // data de la página actual
  currentPage: number; // Número de página actual
  itemsPerPage: number; // Número de elementos por página
  currentSort: SortProjects; // Orden actual de los proyectos

  // Acciones
  setProjects: (projects: ProjectData[]) => void;
  searchProjects: (query: string) => void; // buscar proyectos por título, ciudad o cliente
  nextPage: () => void; // avanzar a la siguiente página
  previousPage: () => void; // retroceder a la página anterior
  lastPage: () => void; // ir a la última página
  firstPage: () => void; // ir a la primera página
  getTotalPages: () => number; // obtener el número total de páginas
  sortProjects: (order: SortProjects) => void; // ordenar proyectos por alfabéticamente por titulo (default), incidencias, rfi o tarea
}

export const useProjectStore = create<ProjectState>((set, get) => {
  // Función interna para no repetir código de "re-paginación"
  const updatePageChunk = (targetPage: number, sourceList: ProjectData[]) => {
    const { itemsPerPage } = get();
    const startIndex = (targetPage - 1) * itemsPerPage;
    set({
      currentPage: targetPage,
      pageProjects: sourceList.slice(startIndex, startIndex + itemsPerPage),
    });
  };

  // funcion interna para ordenar
  const sorted = (order: SortProjects) => {
    const { filteredProjects } = get();
    // Creamos una copia para no mutar el estado directamente antes del set
    const sorted = [...filteredProjects].sort((a, b) => {
      switch (order) {
        case "alphabetically":
          return a.title.localeCompare(b.title, undefined, {
            numeric: true,
            sensitivity: "base",
          });

        case "incidents": {
          const countA =
            a.incidents?.filter((i) => i.item === "incidents").length || 0;
          const countB =
            b.incidents?.filter((i) => i.item === "incidents").length || 0;
          return countB - countA; // Descendente: más incidencias primero
        }

        case "rfi": {
          const countA =
            a.incidents?.filter((i) => i.item === "RFI").length || 0;
          const countB =
            b.incidents?.filter((i) => i.item === "RFI").length || 0;
          return countB - countA;
        }

        case "task": {
          const countA =
            a.incidents?.filter((i) => i.item === "task").length || 0;
          const countB =
            b.incidents?.filter((i) => i.item === "task").length || 0;
          return countB - countA;
        }

        default:
          return 0;
      }
    });

    return sorted;
  };

  return {
    allProjects: [],
    filteredProjects: [],
    pageProjects: [],
    currentPage: 1,
    itemsPerPage: 10,
    currentSort: "alphabetically",

    // función inicial para cargar proyectos
    setProjects: (projects) => {
      set({
        allProjects: projects,
        filteredProjects: projects,
        currentPage: 1,
      });
      updatePageChunk(1, projects);
    },

    // buscar proyectos por título, ciudad o cliente
    searchProjects: (query) => {
      const { allProjects, currentSort } = get();
      const lowerQuery = query.toLowerCase();

      // Si no hay query, se queda vacio, si hay, filtramos
      const filtered = !query
        ? allProjects
        : allProjects.filter(
            (p) =>
              p.title.toLowerCase().includes(lowerQuery) ||
              p.city.toLowerCase().includes(lowerQuery) ||
              p.clientData.title.toLowerCase().includes(lowerQuery),
          );

      set({ filteredProjects: filtered });

      if (!query) {
        // set({ currentSort: "alphabetically" });
        const _sorted = sorted(currentSort);
        updatePageChunk(1, _sorted);
      } else {
        updatePageChunk(1, filtered); // Reset a página 1 con la nueva lista
      }
    },

    nextPage: () => {
      const { currentPage, filteredProjects } = get();
      if (currentPage < get().getTotalPages()) {
        updatePageChunk(currentPage + 1, filteredProjects);
      }
    },

    previousPage: () => {
      const { currentPage, filteredProjects } = get();
      if (currentPage > 1) {
        updatePageChunk(currentPage - 1, filteredProjects);
      }
    },

    firstPage: () => {
      updatePageChunk(1, get().filteredProjects);
    },

    lastPage: () => {
      updatePageChunk(get().getTotalPages(), get().filteredProjects);
    },

    getTotalPages: () => {
      const { filteredProjects, itemsPerPage } = get();
      return Math.ceil(filteredProjects.length / itemsPerPage) || 1;
    },

    sortProjects: (order) => {
      const _sorted = sorted(order);

      set({ filteredProjects: _sorted });
      set({ currentSort: order });
      updatePageChunk(1, _sorted); // Siempre reiniciamos a la página 1 al ordenar
    },
  };
});
