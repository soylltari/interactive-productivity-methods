"use client";
import MethodCard from "@/components/ui/MethodCard";
import methodsData from "@/app/data/methods.json";
import { ProductivityMethod } from "@/app/definitions/definitions";
import Search from "../components/features/search/Search";
import { useSearchStore } from "../store/useSearchStore";
import { useMemo } from "react";
import TagFilter from "../components/features/search/TagFilter";

const methods: ProductivityMethod[] = methodsData;

export default function Library() {
  const searchQuery = useSearchStore((state) => state.searchQuery);
  const selectedTags = useSearchStore((state) => state.selectedTags);

  const filteredMethods = useMemo(() => {
    return methods.filter((method) => {
      const matchesSearch = method.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => method.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [searchQuery, selectedTags]);
  return (
    <>
      <div>
        <h1>Library</h1>
        <p className="text-sm text-gray-500">
          Click on the method to learn more about it
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-4 items-center max-w-full">
        <div className="w-full min-w-0 md:flex-1">
          <TagFilter methods={methods} />
        </div>

        <div className="hidden md:block w-px h-8 bg-gray-200 mx-2"></div>

        <div className="w-full md:w-auto md:shrink-0">
          <Search />
        </div>
      </div>
      <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
        {filteredMethods.length > 0 ? (
          filteredMethods.map((method) => (
            <MethodCard key={method.id} method={method} />
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-gray-500">
            <p className="text-lg">No matching methods found.</p>
            {(searchQuery || selectedTags.length > 0) && (
              <button
                onClick={() => useSearchStore.getState().resetFilters()}
                className="mt-2 text-blue-500 underline hover:text-blue-600"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
