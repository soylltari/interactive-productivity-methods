"use client";
import { MethodComponentProps } from "@/app/definitions/definitions";
import { useTaskManagement } from "../../hooks/useTaskManagement";
import AddTask from "../ui/AddTask";

export default function IvyLeeMethod({ methodData }: MethodComponentProps) {
  const { tasks, inputValue, setInputValue, addTask, deleteTask } =
    useTaskManagement(methodData.id, {
      maxTasks: 6,
    });
  return (
    <>
      <AddTask
        inputValue={inputValue}
        setInputValue={setInputValue}
        onAdd={() => addTask()}
        placeholder="Add up to 6 tasks"
      />
      <div>
        {tasks &&
          tasks.map((task) => {
            const colorClass =
              task.order! <= 2
                ? "text-green-800 bg-green-200"
                : task.order! <= 5
                  ? "text-blue-800 bg-blue-200"
                  : "text-yellow-800 bg-yellow-200";
            return (
              <button
                key={task.id}
                onClick={() => deleteTask(task.id)}
                className="group flex items-center my-6"
                aria-label={`Delete task: ${task.text}, order: ${task.order}`}
              >
                <span
                  className={`flex justify-center items-center size-10 md:w-12 md:h-12 rounded-full mr-3 font-bold cursor-pointer transition-all group-hover:text-gray-800 group-hover:bg-gray-400 ${colorClass}`}
                >
                  {task.order}
                </span>
                <span
                  className={`w-60 max-h-48 md:w-lg overflow-y-auto px-4 py-2 rounded-2xl group-hover:text-gray-800 group-hover:bg-gray-400 group-hover:line-through ${colorClass}`}
                >
                  {task.text}
                </span>
              </button>
            );
          })}
      </div>
    </>
  );
}
