import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ProductivityMethod } from "../definitions/definitions";

interface HistoryState {
  history: ProductivityMethod[];
  addToHistory: (method: ProductivityMethod) => void;
}

const MAX_HISTORY = 3;

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      history: [],
      addToHistory: (method) =>
        set((state) => {
          const filtered = state.history.filter((m) => m.id !== method.id);

          const newHistory = [method, ...filtered].slice(0, MAX_HISTORY);

          return { history: newHistory };
        }),
    }),
    {
      name: "user-history",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
