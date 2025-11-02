import { useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { MethodComponentProps, Task } from "../../definitions";

export default function EatTheFrog({ methodData }: MethodComponentProps) {
  const [tasks, setTasks] = useLocalStorage<Task[]>(methodData.id, []);
  const [inputValue, setInputValue] = useState<string>("");
  const [animate, setAnimate] = useState<number | null>(null);

  function addTask() {
    if (tasks.length === 2) return;
    const task = {
      id: Date.now(),
      text: inputValue || "Frog",
    };
    setTasks([...tasks, task]);
    setInputValue("");
  }

  function deleteTask(index: number) {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  }

  function handleClick(index: number) {
    setAnimate(index);
    setTimeout(() => {
      deleteTask(index);
      setAnimate(null);
    }, 500);
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          value={inputValue}
          placeholder="Only 2 frogs a day 🐸"
          onChange={(e) => setInputValue(e.target.value)}
          className="bg-white border-0 shadow-sm shadow-blue-100 rounded-full focus:outline-none px-5 py-2"
        />
        <button
          onClick={addTask}
          className="bg-green-400 text-gray-50 rounded-full p-2"
        >
          Create Frog
        </button>
      </div>
      <div className="flex items-center justify-center gap-8 min-h-44">
        {tasks.length > 0 ? (
          tasks.map((task, id) => (
            <div
              key={task.id}
              onClick={() => handleClick(id)}
              className={`flex flex-col items-center cursor-pointer w-40 ${
                animate === id ? "animate-[bump_.5s_ease-in]" : ""
              }`}
            >
              <div className="h-12 flex items-center justify-center mb-2 px-2">
                <p className="text-center text-sm leading-tight line-clamp-3 break-words">
                  {task.text}
                </p>
              </div>
              <img
                src={methodData.icon}
                alt={methodData.id}
                className="h-40 w-40 object-contain"
              />
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No frogs yet...</p>
        )}
      </div>
    </>
  );
}
