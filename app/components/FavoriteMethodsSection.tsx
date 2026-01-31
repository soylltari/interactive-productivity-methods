"use client";
import { useFavoritesStore } from "@/app/store/useFavoritesStore";
import MethodCard from "@/app/components/MethodCard";

export default function FavoriteMethodsSection() {
  const favorites = useFavoritesStore((state) => state.favorites);

  return (
    <section>
      <h2>Your Favorites</h2>

      {favorites.length > 0 ? (
        <div className="grid gap-10 items-center md:grid-cols-2 xl:grid-cols-3">
          {favorites.map((method) => (
            <MethodCard key={method.id} method={method} />
          ))}
        </div>
      ) : (
        <p>No favorites</p>
      )}
    </section>
  );
}
