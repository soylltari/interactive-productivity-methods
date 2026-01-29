"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import quiz from "@/app/data/quiz.json";
import { QuizQuestion, QuizAnswer } from "@/app/definitions/definitions";

const quizData: QuizQuestion[] = quiz;

export default function Quiz() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [tags, setTags] = useState<string[]>([]);

  function handleAnswer(selectedAnswer: QuizAnswer["tags"]): void {
    const selectedTags = [...tags, ...selectedAnswer];
    setTags(selectedTags);

    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      const queryString = selectedTags.join(",");
      router.push(`/quiz/results?tags=${queryString}`);
    }
  }

  return (
    <>
      <div className="space-y-2">
        <h1>{quizData[currentQuestion].question}</h1>
        <p className="text-blue-400">
          Question {currentQuestion + 1}/{quizData.length}
        </p>
      </div>
      <div className="space-y-6 flex flex-col items-center">
        {quizData[currentQuestion].answers.map((answer, id) => (
          <div
            key={id}
            className="main-gradient p-0.5 rounded-3xl w-full md:w-fit"
          >
            <button
              onClick={() => handleAnswer(answer.tags)}
              className="bg-gray-50 rounded-[1.4rem] px-6 py-4 cursor-pointer text-lg w-full md:w-fit"
            >
              {answer.text}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
