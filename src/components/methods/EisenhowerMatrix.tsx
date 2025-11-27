import { MethodComponentProps, Task } from "@/definitions";
import arrowDown from "@/assets/arrow-down.svg";
import { useTaskManagement } from "./hooks/useTaskManagement";
import AddTask from "../AddTask";

interface MatrixTask extends Task {
  urgency: MatrixUrgency;
}

type MatrixUrgency =
  | "importantUrgent"
  | "importantNotUrgent"
  | "notImportantUrgent"
  | "notImportantNotUrgent";

const quadrants = [
  {
    title: "Important & Urgent",
    key: "importantUrgent",
    colorClass: "bg-red-100 border-red-400",
    headerClass: "bg-red-200 border-red-400",
  },
  {
    title: "Important & Not Urgent",
    key: "importantNotUrgent",
    colorClass: "bg-green-100 border-green-400",
    headerClass: "bg-green-200 border-green-400",
  },
  {
    title: "Urgent & Not Important",
    key: "notImportantUrgent",
    colorClass: "bg-yellow-100 border-yellow-400",
    headerClass: "bg-yellow-200 border-yellow-400",
  },
  {
    title: "Not Important & Not Urgent",
    key: "notImportantNotUrgent",
    colorClass: "bg-gray-100 border-gray-400",
    headerClass: "bg-gray-200 border-gray-400",
  },
] as const;

export default function EisenhowerMatrix({ methodData }: MethodComponentProps) {
  const {
    tasks,
    inputValue,
    setInputValue,
    urgency,
    setUrgency,
    addTask,
    deleteTask,
  } = useTaskManagement<MatrixTask>(methodData.id, {
    initialUrgency: "notImportantNotUrgent",
  });

  const handleAddTask = () => {
    addTask(urgency);
  };

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
    <>
      <div className="flex flex-col items-center gap-4 w-fit">
        <div className="relative w-full">
          <select
            value={urgency}
            onChange={(e) => setUrgency(e.target.value)}
            className="bg-white border-0 shadow-sm shadow-blue-100 rounded-full focus:outline-none px-5 py-2 pr-10 appearance-none cursor-pointer"
          >
            {quadrants.map((q) => (
              <option key={q.key} value={q.key}>
                {q.title}
              </option>
            ))}
          </select>
          <img
            className="pointer-events-none absolute inset-y-0 right-0 flex items-center pt-2 pr-2"
            src={arrowDown}
          />
        </div>
        <div className="w-full">
          <AddTask
            inputValue={inputValue}
            setInputValue={setInputValue}
            onAdd={handleAddTask}
            buttonText="Add Task"
            placeholder="Prioritize your tasks"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 w-full md:w-[40rem]">
        {quadrants.map((q) => (
          <div
            key={q.key}
            className={`border-2 rounded-lg ${q.colorClass} h-64 overflow-y-auto`}
          >
            <div
              className={`p-3 font-bold text-center border-b-2 ${q.headerClass}`}
            >
              <h3 className="text-lg m-0">{q.title}</h3>
            </div>
            <div className="p-3">
              {grouped[q.key].map((task) => (
                <p
                  key={task.id}
                  onClick={() => deleteTask(task.id)}
                  className="cursor-pointer hover:line-through text-sm my-1"
                >
                  • {task.text}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
