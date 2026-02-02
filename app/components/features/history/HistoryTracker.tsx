"use client";

import { useEffect } from "react";
import { useHistoryStore } from "@/app/store/useHistoryStore";
import { ProductivityMethod } from "@/app/definitions/definitions";

export default function HistoryTracker({
  method,
}: {
  method: ProductivityMethod;
}) {
  const addToHistory = useHistoryStore((state) => state.addToHistory);

  useEffect(() => {
    if (method) {
      addToHistory(method);
    }
  }, [method, addToHistory]);

  return null;
}
