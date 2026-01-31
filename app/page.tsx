"use client";
import Home from "@/app/components/Home";
import { useFavoritesStore } from "./store/useFavoritesStore";
import FavoriteMethodsSection from "./components/FavoriteMethodsSection";
import Link from "next/link";

export default function MainPage() {
  const favorites = useFavoritesStore((state) => state.favorites);
  return (
    <>
      {favorites.length > 0 ? <FavoriteMethodsSection /> : <Home />}
      <p className="text-blue-500">
        or{" "}
        <Link href="/library" className="underline hover:text-blue-600">
          Browse methods
        </Link>
      </p>
    </>
  );
}
