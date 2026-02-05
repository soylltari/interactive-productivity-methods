import { create } from "zustand";

interface SearchState {
  searchQuery: string;
  selectedTags: string[];
  setSearchQuery: (query: string) => void;
  toggleTag: (tag: string) => void;
  resetFilters: () => void;
}

export const useSearchStore = create<SearchState>()((set) => ({
  searchQuery: "",
  selectedTags: [],
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  toggleTag: (tag: string) =>
    set((state) => {
      const isSelected = state.selectedTags.includes(tag);
      return {
        selectedTags: isSelected
          ? state.selectedTags.filter((t) => t !== tag)
          : [...state.selectedTags, tag],
      };
    }),
  resetFilters: () => set({ searchQuery: "", selectedTags: [] }),
}));
