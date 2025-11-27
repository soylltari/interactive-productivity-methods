import { useState } from "react";
import { Link } from "react-router-dom";
import quiz from "../data/quiz.json";
import methodsData from "../data/methods.json";
import { ProductivityMethod, QuizQuestion, QuizAnswer } from "../definitions";

const methods: ProductivityMethod[] = methodsData;
const quizData: QuizQuestion[] = quiz;

interface MethodWithScore extends ProductivityMethod {
  score: number;
}

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [tags, setTags] = useState<string[]>([]);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [topMethod, setTopMethod] = useState<MethodWithScore | null>(null);
  const [allMethodsWithScores, setAllMethodsWithScores] = useState<
    MethodWithScore[]
  >([]);

  function handleAnswer(selectedAnswer: QuizAnswer["tags"]): void {
    let selectedTags = [...tags, ...selectedAnswer];
    setTags(selectedTags);

    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      calculateResults(selectedTags);
    }
  }

  function calculateResults(tags: string[]): void {
    const tagCounts = tags.reduce<Record<string, number>>((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {});

    const methodsWithScores = methods.map((method) => {
      let score = 0;
      method.tags.forEach((tag) => {
        if (tagCounts[tag]) {
          score += tagCounts[tag];
        }
      });

      return {
        ...method,
        score: score,
      };
    });

    const sortedMethods = [...methodsWithScores].sort(
      (a, b) => b.score - a.score
    );

    setTopMethod(sortedMethods[0]);
    setAllMethodsWithScores(sortedMethods);
    setQuizCompleted(true);
  }

  function restartQuiz(): void {
    setCurrentQuestion(0);
    setTags([]);
    setTopMethod(null);
    setAllMethodsWithScores([]);
    setQuizCompleted(false);
  }

  return (
    <>
      {quizCompleted && topMethod ? (
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
            to={`/library/${topMethod.id}`}
            className="cursor-pointer flex flex-col justify-center gap-2 mb-4 md:w-1/2"
          >
            <span className="text-3xl">👑</span>
            <img src={topMethod.icon} alt={topMethod.id} className="h-24" />
            <h2>{topMethod.name}</h2>
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
                  method.score === topMethod?.score
                    ? "bg-green-100 rounded-sm"
                    : ""
                }`}
              >
                <div className="flex items-center flex-grow min-w-0">
                  <img src={method.icon} alt={method.id} className="h-6 mr-2" />
                  <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                    {method.name}
                  </p>
                </div>

                <span className="ml-8">{method.score}</span>
              </div>
            ))}
          </div>

          <button
            onClick={restartQuiz}
            className="cursor-pointer main-gradient mt-6 px-12 py-4 rounded-full text-gray-50 text-lg transition-transform hover:scale-105 shadow-[0px_4px_24px_0_rgba(147,197,253,.70)]"
          >
            Try again
          </button>
          <Link
            to="/library"
            className="text-blue-500 underline hover:text-blue-700"
          >
            Browse the complete library of methods
          </Link>
        </>
      ) : (
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
                className="main-gradient p-[2px] rounded-3xl w-full md:w-fit"
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
      )}
    </>
  );
}
