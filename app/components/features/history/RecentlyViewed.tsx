"use client";
import MethodCard from "@/app/components/ui/MethodCard";
import { useHistoryStore } from "@/app/store/useHistoryStore";

export default function RecentlyViewed() {
  const history = useHistoryStore((state) => state.history);

  return (
    <section>
      <h2 className="mb-6">Your History</h2>

      {history.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-10">
          {history.map((method) => (
            <MethodCard key={method.id} method={method} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No history</p>
      )}
    </section>
  );
}
