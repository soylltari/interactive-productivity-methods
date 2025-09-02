import { useParams } from "react-router-dom";
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
    <div>
      <h1>{method.name}</h1>
      <div>
        <h2>How to Use:</h2>
        <p>{method.howToUse}</p>
      </div>
      <div>
        <h3>Tags:</h3>
        <ul className="flex gap-4">
          {method.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
      <Suspense fallback={<div>Loading method...</div>}>
        <MethodComponent methodData={method} />
      </Suspense>
    </div>
  );
}
