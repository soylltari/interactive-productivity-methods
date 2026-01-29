"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, Suspense, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import methodsData from "@/app/data/methods.json";
import { ProductivityMethod } from "@/app/definitions/definitions";

interface MethodWithScore extends ProductivityMethod {
  score: number;
}

function ResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { topMethod, allMethodsWithScores } = useMemo<{
    topMethod: MethodWithScore | null;
    allMethodsWithScores: MethodWithScore[] | [];
  }>(() => {
    const tagsParam = searchParams.get("tags");

    if (!tagsParam) return { topMethod: null, allMethodsWithScores: [] };

    const tags = tagsParam.split(",");

    const tagCounts = tags.reduce<Record<string, number>>((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {});

    const methodsWithScores = methodsData.map((method) => {
      let score = 0;
      method.tags.forEach((tag) => {
        if (tagCounts[tag]) {
          score += tagCounts[tag];
        }
      });
      return { ...method, score };
    });

    const sortedMethods = [...methodsWithScores].sort(
      (a, b) => b.score - a.score,
    );

    return {
      topMethod: sortedMethods[0],
      allMethodsWithScores: sortedMethods,
    };
  }, [searchParams]);

  useEffect(() => {
    if (!searchParams.get("tags")) {
      router.push("/");
    }
  }, [searchParams, router]);

  if (!topMethod) {
    return <div className="p-8 text-center">Calculating results...</div>;
  }

  return (
    <>
      <div>
        <h1>
          Your{" "}
          <span className="text-transparent bg-clip-text main-gradient">
            Best
          </span>{" "}
          Match
        </h1>
        <p className="text-sm text-gray-500">
          Click on your method below to learn more about it
        </p>
      </div>

      <Link
        href={`/library/${topMethod.id}`}
        className="group cursor-pointer flex flex-col items-center justify-center gap-2 mb-4 md:w-1/2"
      >
        <span className="text-3xl">👑</span>
        <Image
          src={topMethod.icon}
          alt={topMethod.name}
          width={96}
          height={96}
          className="transition-transform group-hover:scale-105"
        />
        <h2 className="group-hover:text-blue-500 transition-colors">
          {topMethod.name}
        </h2>
        <p className="text-gray-600">{topMethod.description}</p>
      </Link>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-center">
          Complete Results
        </h3>
        {allMethodsWithScores.map((method, id) => (
          <div
            key={id}
            className={`flex justify-between items-center py-3 px-2 ${
              method.score === topMethod?.score ? "bg-green-100 rounded-sm" : ""
            }`}
          >
            <div className="flex items-center grow min-w-0">
              <Image
                src={method.icon}
                alt={method.name}
                height={24}
                width={24}
                className="h-6 mr-2"
              />
              <Link
                href={`/library/${method.id}`}
                className="whitespace-nowrap overflow-hidden text-ellipsis hover:text-blue-500 transition-colors"
              >
                {method.name}
              </Link>
            </div>
            <span className="ml-8">{method.score}</span>
          </div>
        ))}
      </div>

      <Link
        href="/"
        className="cursor-pointer main-gradient mt-6 px-12 py-4 rounded-full text-gray-50 text-lg transition-transform hover:scale-105 shadow-[0px_4px_24px_0_rgba(147,197,253,.70)] inline-block text-center"
      >
        Try again
      </Link>

      <div className="mt-4">
        <Link
          href="/library"
          className="text-blue-500 underline hover:text-blue-700"
        >
          Browse the complete library of methods
        </Link>
      </div>
    </>
  );
}

export default function QuizResultPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultsContent />
    </Suspense>
  );
}
