import { ProjectData } from "@/types/project";
import { create } from "zustand";

interface SelectionState {
  selectedProjects: Partial<ProjectData>[]; // Usamos un array para almacenar varios IDs

  toggleSelection: (project: Partial<ProjectData>) => void;
  clearSelection: () => void;
}

export const useSelectionStore = create<SelectionState>((set, get) => ({
  selectedProjects: [],
  toggleSelection: (project) => {
    const { selectedProjects } = get();
    const find = selectedProjects.find((item) => item._id === project._id);
    if (find) {
      set({
        selectedProjects: selectedProjects.filter(
          (item) => item._id !== project._id,
        ),
      });
    } else {
      set({ selectedProjects: [...selectedProjects, project] });
    }
  },
  clearSelection: () => set({ selectedProjects: [] }),
}));
