import { useState } from "react";
import { MethodComponentProps, Task } from "../../definitions";
import { useLocalStorage } from "./hooks/useLocalStorage";

interface MatrixTask extends Task {
  urgency: MatrixUrgency;
}

type MatrixUrgency =
  | "importantUrgent"
  | "importantNotUrgent"
  | "notImportantUrgent"
  | "notImportantNotUrgent";

const quadrants = [
  { title: "Important & Urgent", key: "importantUrgent" },
  { title: "Important & Not Urgent", key: "importantNotUrgent" },
  { title: "Urgent & Not Important", key: "notImportantUrgent" },
  { title: "Not Important & Not Urgent", key: "notImportantNotUrgent" },
] as const;

export default function EisenhowerMatrix({ methodData }: MethodComponentProps) {
  const [tasks, setTasks] = useLocalStorage<MatrixTask[]>(methodData.id, []);
  const [inputValue, setInputValue] = useState<string>("");
  const [urgency, setUrgency] = useState<MatrixUrgency>(
    "notImportantNotUrgent"
  );

  function addTask() {
    if (!inputValue.trim()) return;
    const task = {
      id: Date.now(),
      text: inputValue,
      urgency: urgency,
    };
    setTasks([...tasks, task]);
    setInputValue("");
  }

  function deleteTask(index: number) {
    setTasks(tasks.filter((t) => t.id !== index));
  }

  function groupTasksByUrgency(tasks: MatrixTask[]) {
    return tasks.reduce(
      (acc, task) => {
        acc[task.urgency].push(task);
        return acc;
      },
      {
        importantUrgent: [],
        importantNotUrgent: [],
        notImportantUrgent: [],
        notImportantNotUrgent: [],
      } as Record<MatrixUrgency, MatrixTask[]>
    );
  }

  const grouped = groupTasksByUrgency(tasks);

  return (
    <div>
      <div className="flex flex-col gap-4">
        <select
          value={urgency}
          onChange={(e) => setUrgency(e.target.value as MatrixUrgency)}
        >
          {quadrants.map((q) => (
            <option key={q.key} value={q.key}>
              {q.title}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={inputValue}
          placeholder="Prioritize your task"
          onChange={(e) => setInputValue(e.target.value)}
          className="bg-white border-0 shadow-sm shadow-blue-100 rounded-full focus:outline-none px-5 py-2"
        />
        <button
          onClick={addTask}
          className="bg-green-400 text-gray-50 rounded-full p-2"
        >
          Add task
        </button>
        {quadrants.map((q) => (
          <div key={q.key}>
            <h3>{q.title}</h3>
            {grouped[q.key].map((task) => (
              <p key={task.id} onClick={() => deleteTask(task.id)}>
                {task.text}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
