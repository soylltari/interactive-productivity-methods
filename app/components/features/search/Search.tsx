"use client";
import { useSearchStore } from "@/app/store/useSearchStore";
import Image from "next/image";

export default function Search() {
  const searchQuery = useSearchStore((state) => state.searchQuery);
  const setSearchQuery = useSearchStore((state) => state.setSearchQuery);
  return (
    <div className="relative">
      <Image
        src="/assets/search.svg"
        alt=""
        width={20}
        height={20}
        className="absolute top-2.5 left-4"
        aria-hidden="true"
      />
      <input
        type="text"
        value={searchQuery}
        placeholder="Search"
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-12"
        aria-label="Search productivity methods"
      />
    </div>
  );
}
