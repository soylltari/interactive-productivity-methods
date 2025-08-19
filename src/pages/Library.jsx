import MethodCard from "../components/MethodCard";
import methods from "../data/methods.json";

export default function Library() {
  return (
    <>
      <div>
        <h1>Library</h1>
        <p className="text-sm text-gray-500">
          Click on the method to learn more about it
        </p>
      </div>
      <div className="grid gap-10 md:grid-cols-3">
        {methods.map((method, id) => (
          <MethodCard key={id} method={method} />
        ))}
      </div>
    </>
  );
}
