import { useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";

export default function EatTheFrog({ methodData }) {
  const [tasks, setTasks] = useLocalStorage(methodData.id, []);
  const [inputValue, setInputValue] = useState("");
  const [animate, setAnimate] = useState(null);

  function addTask() {
    if (tasks.length === 2) return;
    const task = {
      id: Date.now(),
      text: inputValue || "Frog",
    };
    setTasks([...tasks, task]);
    setInputValue("");
  }

  function deleteTask(index) {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  }

  function handleClick(index) {
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
          onChange={(e) => setInputValue(e.target.value)}
          className="bg-white border-0 shadow-sm shadow-blue-100 rounded-full focus:outline-none px-5 py-2 "
        />
        <button
          onClick={addTask}
          className="bg-green-400 text-gray-50 rounded-full p-2"
        >
          Create Frog
        </button>
        <p className="text-sm text-gray-500">
          Note: Limit your frogs to a maximum of 2 tasks per day
        </p>
      </div>
      <div className="flex gap-2.5 min-h-40">
        {tasks.map((task, id) => (
          <div
            key={id}
            onClick={() => handleClick(id)}
            className={`flex flex-col flex-wrap justify-center max-w-40 ${
              animate === id ? "animate-[bump_.5s_ease-in]" : ""
            }`}
          >
            <p>{task.text}</p>
            <img
              src={methodData.icon}
              alt={methodData.id}
              className="h-40 w-40"
            />
          </div>
        ))}
      </div>
    </>
  );
}
