import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import methodsData from "../data/methods.json";

export default function MethodDetail() {
  const { methodId } = useParams();
  const [method, setMethod] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundMethod = methodsData.find((method) => method.id === methodId);
    setMethod(foundMethod);
    setLoading(false);
  }, [methodId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!method) {
    return <div>Method not found</div>;
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
        <ul>
          {method.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
