"use client";

import dynamic from "next/dynamic";
import { ProductivityMethod } from "@/app/definitions/definitions";

const methodComponents: Record<string, any> = {
  "eisenhower-matrix": dynamic(
    () => import("@/components/methods/EisenhowerMatrix"),
    { ssr: false },
  ),
  "eat-the-frog": dynamic(() => import("@/components/methods/EatTheFrog"), {
    ssr: false,
  }),
  pomodoro: dynamic(() => import("@/components/methods/PomodoroTechnique"), {
    ssr: false,
  }),
  "ivy-lee-method": dynamic(() => import("@/components/methods/IvyLeeMethod"), {
    ssr: false,
  }),
  "time-blocking": dynamic(() => import("@/components/methods/TimeBlocking"), {
    ssr: false,
  }),
};

interface RendererProps {
  methodId: string;
  methodData: ProductivityMethod;
}

export default function MethodRenderer({
  methodId,
  methodData,
}: RendererProps) {
  const Method = methodComponents[methodId];

  return <Method methodData={methodData} />;
}
