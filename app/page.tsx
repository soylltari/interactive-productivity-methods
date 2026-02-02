"use client";
import Home from "@/app/components/features/Home";
import { useFavoritesStore } from "./store/useFavoritesStore";
import FavoriteMethodsSection from "./components/features/favorite/FavoriteMethodsSection";
import Link from "next/link";
import RecentlyViewed from "./components/features/history/RecentlyViewed";
import { useHistoryStore } from "./store/useHistoryStore";

export default function MainPage() {
  const favorites = useFavoritesStore((state) => state.favorites);
  const history = useHistoryStore((state) => state.history);

  return (
    <>
      {favorites.length === 0 && history.length === 0 ? (
        <Home />
      ) : (
        <>
          {favorites.length > 0 && <FavoriteMethodsSection />}
          {history.length > 0 && <RecentlyViewed />}
        </>
      )}
      <p className="text-blue-500">
        or{" "}
        <Link href="/library" className="underline hover:text-blue-600">
          Browse methods
        </Link>
      </p>
    </>
  );
}
