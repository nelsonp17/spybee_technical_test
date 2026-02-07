import { create } from "zustand";

// Definimos los tipos de vista para evitar errores de escritura
export type ViewMode = "list" | "grid" | "map";

interface ViewState {
  view: ViewMode;
  setView: (newView: ViewMode) => void;
}

export const useViewStore = create<ViewState>((set) => ({
  view: "list", // Vista por defecto
  setView: (newView) => set({ view: newView }),
}));
