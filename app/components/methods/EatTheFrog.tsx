"use client";

import { useState } from "react";
import { MethodComponentProps } from "@/app/definitions/definitions";
import { useTaskManagement } from "../../hooks/useTaskManagement";
import AddTask from "../ui/AddTask";
import Image from "next/image";

export default function EatTheFrog({ methodData }: MethodComponentProps) {
  const [animate, setAnimate] = useState<number | null>(null);

  const { tasks, inputValue, setInputValue, addTask, deleteTask } =
    useTaskManagement(methodData.id, {
      maxTasks: 2,
      defaultText: "Frog",
    });

  function handleClick(taskId: number, index: number) {
    setAnimate(index);
    setTimeout(() => {
      deleteTask(taskId);
      setAnimate(null);
    }, 500);
  }

  return (
    <>
      <AddTask
        inputValue={inputValue}
        setInputValue={setInputValue}
        onAdd={() => addTask()}
        buttonText="Create Frog"
        placeholder="Only 2 frogs a day 🐸"
      />
      <div className="flex items-center justify-center gap-8 min-h-48 md:gap-20 md:min-h-54">
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <button
              key={task.id}
              onClick={() => handleClick(task.id, index)}
              className={`flex flex-col items-center cursor-pointer w-40 ${
                animate === index ? "animate-[bump_.5s_ease-in]" : ""
              }`}
              aria-label={`Delete task: ${task.text}`}
            >
              <span className="h-12 flex items-center justify-center mb-2 px-2">
                <span className="text-center text-sm leading-tight overflow-y-auto wrap-break-words max-h-14">
                  {task.text}
                </span>
              </span>
              <Image
                src={methodData.icon}
                alt=""
                height={128}
                width={128}
                className="md:h-40 md:w-40 object-contain"
                aria-hidden="true"
              />
            </button>
          ))
        ) : (
          <p className="text-sm text-gray-500">No frogs yet...</p>
        )}
      </div>
    </>
  );
}
