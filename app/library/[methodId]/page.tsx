import Link from "next/link";
import methodsData from "@/app/data/methods.json";
import { ProductivityMethod } from "@/app/definitions/definitions";
import { notFound } from "next/navigation";
import MethodRenderer from "@/app/components/methods/MethodsRenderer";
import HistoryTracker from "@/app/components/features/history/HistoryTracker";

interface MethodDetailProps {
  params: Promise<{ methodId: string }>;
}

export async function generateStaticParams() {
  return methodsData.map((method) => ({
    methodId: method.id,
  }));
}

export default async function MethodDetail({ params }: MethodDetailProps) {
  const { methodId } = await params;
  const method: ProductivityMethod | undefined = methodsData.find(
    (m) => m.id === methodId,
  );

  if (!method) {
    notFound();
  }

  return (
    <>
      <h1>{method.name}</h1>
      <MethodRenderer methodId={methodId} methodData={method} />
      <div className="max-w-2xl">
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
        href="/library"
        className="text-blue-500 underline hover:text-blue-700"
      >
        Browse other methods
      </Link>
      <HistoryTracker method={method} />
    </>
  );
}
