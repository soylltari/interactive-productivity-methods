import { MethodComponentProps, Task } from "@/definitions";
import { useTaskManagement } from "./hooks/useTaskManagement";
import AddTask from "../AddTask";

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
              <div key={task.id} className="flex items-center my-6">
                <p
                  onClick={() => deleteTask(task.id)}
                  className={`flex justify-center items-center w-10 h-10 md:w-12 md:h-12 rounded-full mr-3 font-bold cursor-pointer transition-all hover:text-gray-800 hover:bg-gray-400  ${colorClass}`}
                >
                  {task.order}
                </p>
                <p
                  className={`w-60 max-h-48 md:w-[32rem] overflow-y-auto px-4 py-2 rounded-2xl ${colorClass}`}
                >
                  {task.text}
                </p>
              </div>
            );
          })}
      </div>
    </>
  );
}
