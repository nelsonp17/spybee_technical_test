import { create } from "zustand";

interface SelectionState {
  selectedProjectIds: string[]; // Usamos un array para almacenar varios IDs
  toggleSelection: (id: string) => void;
  clearSelection: () => void;
}

export const useSelectionStore = create<SelectionState>((set) => ({
  selectedProjectIds: [],
  toggleSelection: (id) =>
    set((state) => ({
      selectedProjectIds: state.selectedProjectIds.includes(id)
        ? state.selectedProjectIds.filter((projectId) => projectId !== id) // Lo quita si ya está
        : [...state.selectedProjectIds, id], // Lo agrega si no está
    })),
  clearSelection: () => set({ selectedProjectIds: [] }),
}));
