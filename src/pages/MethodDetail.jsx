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

  useEffect(() => {
    const foundMethod = methods.find((method) => method.id === methodId);
    setMethod(foundMethod);
  }, [methodId]);

  if (!method) {
    return <div>Method not found</div>;
  }

  const MethodComponent = methodComponents[methodId];

  console.log(MethodComponent);

  if (!MethodComponent) {
    return <div>Method component not implemented yet</div>;
  }

  return (
    <>
      <h1>{method.name}</h1>
      <Suspense fallback={<div>Loading method...</div>}>
        <MethodComponent methodData={method} />
      </Suspense>
      <div>
        <h2>How to Use:</h2>
        <p>{method.howToUse}</p>
      </div>
      <div className="flex flex-col justify-center">
        <h3>Tags:</h3>
        <ul className="flex flex-wrap mt-4 gap-2">
          {method.tags.map((tag, id) => (
            <li
              key={id}
              className="capitalize text-sm bg-blue-300 rounded-full px-2"
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
