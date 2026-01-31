import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ProductivityMethod } from "../definitions/definitions";

interface FavoritesState {
  favorites: ProductivityMethod[];
  toggleFavorite: (methodId: ProductivityMethod) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
      favorites: [],

      toggleFavorite: (method) =>
        set((state) => {
          const isAlreadyFav = state.favorites.some((m) => m.id === method.id);

          if (isAlreadyFav) {
            return {
              favorites: state.favorites.filter((m) => m.id !== method.id),
            };
          } else {
            return {
              favorites: [...state.favorites, method],
            };
          }
        }),
    }),
    {
      name: "user-favorites",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
