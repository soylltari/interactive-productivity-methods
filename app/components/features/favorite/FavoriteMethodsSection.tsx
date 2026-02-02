"use client";
import { useFavoritesStore } from "@/app/store/useFavoritesStore";
import MethodCard from "@/app/components/ui/MethodCard";

export default function FavoriteMethodsSection() {
  const favorites = useFavoritesStore((state) => state.favorites);

  return (
    <section>
      <h2 className="mb-6">Your Favorites</h2>

      {favorites.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-10">
          {favorites.map((method) => (
            <MethodCard key={method.id} method={method} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No favorites</p>
      )}
    </section>
  );
}
