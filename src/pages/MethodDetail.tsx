import { Link, useParams } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import methodsData from "@/data/methods.json";
import { ProductivityMethod } from "@/definitions";

const methods: ProductivityMethod[] = methodsData;
const methodComponents = {
  "eisenhower-matrix": lazy(
    () => import("@/components/methods/EisenhowerMatrix")
  ),
  "eat-the-frog": lazy(() => import("@/components/methods/EatTheFrog")),
  pomodoro: lazy(() => import("@/components/methods/PomodoroTechnique")),
  "ivy-lee-method": lazy(() => import("@/components/methods/IvyLeeMethod")),
  "time-blocking": lazy(() => import("@/components/methods/TimeBlocking")),
};

export default function MethodDetail() {
  const { methodId } = useParams<string>();
  const [method, setMethod] = useState<ProductivityMethod | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setMethod(methods.find((method) => method.id === methodId) ?? null);
    setIsLoading(false);
  }, [methodId]);

  if (isLoading) return <div>Loading...</div>;

  if (!method) {
    return <div>Method not found</div>;
  }

  const MethodComponent = methodId
    ? methodComponents[methodId as keyof typeof methodComponents]
    : undefined;

  if (!MethodComponent) {
    return <div>Method component not implemented yet</div>;
  }

  return (
    <>
      <h1>{method.name}</h1>
      <Suspense fallback={<div>Loading method...</div>}>
        <MethodComponent methodData={method} />
      </Suspense>
      <div className="md:w-2xl">
        <h2>How to Use:</h2>
        <p className="text-gray-600">{method.howToUse}</p>
      </div>
      <div className="flex flex-col justify-center">
        <h3>Tags:</h3>
        <ul className="flex justify-center flex-wrap mt-4 gap-2">
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
      <Link
        to="/library"
        className="text-blue-500 underline hover:text-blue-700"
      >
        Browse other methods
      </Link>
    </>
  );
}
