"use client";
import { ProductivityMethod } from "@/app/definitions/definitions";
import Image from "next/image";
import { useFavoritesStore } from "@/app/store/useFavoritesStore";
import Link from "next/link";

interface MethodCardProps {
  method: ProductivityMethod;
}

export default function MethodCard({ method }: MethodCardProps) {
  const favorites = useFavoritesStore((state) => state.favorites);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  const isFav = favorites.some((m) => m.id === method.id);
  return (
    <Link href={`/library/${method.id}`}>
      <article className="main-gradient p-0.5 rounded-3xl w-80 min-h-86 hover:shadow-[0px_4px_14px_0_rgba(147,197,253,.70)] transition-all">
        <div className="bg-gray-50 rounded-[1.4rem] cursor-pointer w-full min-h-92 flex flex-col relative">
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(method);
            }}
            className="absolute top-3 right-3.5 transition-transform active:scale-95"
            aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          >
            {isFav ? (
              <Image
                src="/assets/heart-filled.svg"
                alt=""
                width={35}
                height={35}
              />
            ) : (
              <Image
                src="/assets/heart-outlined.svg"
                alt=""
                width={35}
                height={35}
              />
            )}
          </button>
          <div className="h-48 flex items-center justify-center p-4">
            <Image
              src={method.icon}
              alt=""
              width={128}
              height={128}
              className="object-contain"
              aria-hidden="true"
            />
          </div>
          <div className="w-full h-0.5 bg-gray-200" aria-hidden="true"></div>
          <div className="px-6 py-6 text-left flex-1 space-y-6">
            <h2>{method.name}</h2>
            <ul className="flex flex-wrap mt-4 gap-2" aria-label="Tags">
              {method.tags.map((tag, id) => (
                <li
                  key={id}
                  className="capitalize text-sm bg-blue-200 text-blue-600 rounded-full px-2 py-1"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          <Image
            src="/assets/arrow-right.svg"
            alt=""
            width={40}
            height={40}
            className="absolute bottom-3 right-3"
            aria-hidden="true"
          />
        </div>
      </article>
    </Link>
  );
}
