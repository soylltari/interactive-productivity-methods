import { Link, useParams } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import methods from "../data/methods.json";

const methodComponents = {
  "eisenhower-matrix": lazy(() =>
    import("../components/methods/EisenhowerMatrix")
  ),
  "eat-the-frog": lazy(() => import("../components/methods/EatTheFrog")),
  pomodoro: lazy(() => import("../components/methods/PomodoroTechnique")),
  "ivy-lee-method": lazy(() => import("../components/methods/IvyLeeMethod")),
  "time-blocking": lazy(() => import("../components/methods/TimeBlocking")),
};

export default function MethodDetail() {
  const { methodId } = useParams();
  const [method, setMethod] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const foundMethod = methods.find((method) => method.id === methodId);
    setMethod(foundMethod);
    setIsLoading(false);
  }, [methodId]);

  if (isLoading) return <div>Loading...</div>;

  if (!method) {
    return <div>Method not found</div>;
  }

  const MethodComponent = methodComponents[methodId];

  if (!MethodComponent) {
    return <div>Method component not implemented yet</div>;
  }

  return (
    <>
      <div>
        <h1>{method.name}</h1>
        <p className="text-sm text-gray-600">{method.description}</p>
      </div>
      <Suspense fallback={<div>Loading method...</div>}>
        <MethodComponent methodData={method} />
      </Suspense>
      <div>
        <h2>How to Use:</h2>
        <p>{method.howToUse}</p>
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
