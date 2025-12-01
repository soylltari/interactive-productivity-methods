import { useState } from "react";
import { MethodComponentProps, Task } from "@/definitions";
import { useTaskManagement } from "./hooks/useTaskManagement";

interface TimeBlockTask extends Task {
  startTime: string;
  endTime: string;
  color: string;
}

const timeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const COLORS = [
  { label: "Red", value: "bg-red-200 border-red-400 text-red-800" },
  { label: "Blue", value: "bg-blue-200 border-blue-400 text-blue-800" },
  { label: "Green", value: "bg-green-200 border-green-400 text-green-800" },
  { label: "Yellow", value: "bg-yellow-200 border-yellow-400 text-yellow-800" },
  { label: "Purple", value: "bg-purple-200 border-purple-400 text-purple-800" },
];

export default function TimeBlocking({ methodData }: MethodComponentProps) {
  const { tasks, setTasks, addTask, deleteTask } =
    useTaskManagement<TimeBlockTask>(methodData.id);

  const [name, setName] = useState("");
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("10:00");
  const [selectedColor, setSelectedColor] = useState(COLORS[0].value);

  const handleAddBlock = () => {
    if (!name.trim()) return;

    const newStartMinutes = timeToMinutes(start);
    const newEndMinutes = timeToMinutes(end);

    if (newEndMinutes <= newStartMinutes) {
      alert("End time must be after start time");
      return;
    }

    const isOverlapping = tasks.some((task) => {
      const taskStart = timeToMinutes(task.startTime);
      const taskEnd = timeToMinutes(task.endTime);
      return newStartMinutes < taskEnd && newEndMinutes > taskStart;
    });

    if (isOverlapping) {
      alert("This time slot overlaps with an existing task!");
      return;
    }

    const newTask: TimeBlockTask = {
      id: Date.now(),
      text: name,
      startTime: start,
      endTime: end,
      color: selectedColor,
    };

    setTasks([...tasks, newTask]);
    setName("");
  };

  const START_HOUR = 5;
  const END_HOUR = 23;
  const PIXELS_PER_MINUTE = 2;
  const hours = Array.from(
    { length: END_HOUR - START_HOUR + 1 },
    (_, i) => i + START_HOUR
  );

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full h-[calc(100vh-200px)]">
      <div className="w-full md:w-1/3 flex flex-col gap-4 p-4 bg-white rounded-2xl shadow-sm shadow-blue-100 h-fit">
        <h3 className="font-bold text-lg text-gray-700">New Time Block</h3>

        {/* Inputs */}
        <input
          type="text"
          placeholder="Task Name (e.g. Deep Work)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className=" border border-gray-200 shadow-xs shadow-blue-100 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-400"
        />
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="text-xs text-gray-500 ml-1">Start</label>
            <input
              type="time"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="w-full border border-gray-200 shadow-xs shadow-blue-100 rounded-lg px-2 py-2 text-sm focus:outline-none focus:border-blue-400"
            />
          </div>
          <div className="flex-1">
            <label className="text-xs text-gray-500 ml-1">End</label>
            <input
              type="time"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="w-full border border-gray-200 shadow-xs shadow-blue-100 rounded-lg px-2 py-2 text-sm focus:outline-none focus:border-blue-400"
            />
          </div>
        </div>

        {/* Color selection */}
        <div>
          <label className="text-xs text-gray-500 ml-1 block mb-2">Color</label>
          <div className="flex gap-2">
            {COLORS.map((c) => (
              <button
                key={c.value}
                onClick={() => setSelectedColor(c.value)}
                className={`w-8 h-8 rounded-full border-2 ${
                  selectedColor === c.value
                    ? "border-blue-900 scale-110"
                    : "border-transparent"
                } ${c.value.split(" ")[0]}`}
              />
            ))}
          </div>
        </div>

        <button
          onClick={handleAddBlock}
          className="bg-green-400 text-gray-50 rounded-full p-2 hover:bg-green-500 transition-colors shadow-sm"
        >
          Add Block
        </button>
      </div>

      {/* Timeline */}
      <div className="w-full md:w-2/3 bg-white rounded-2xl shadow-sm shadow-blue-100 overflow-y-auto relative border border-gray-100 scrollbar-thin">
        {/* Hours grid */}
        <div className="absolute top-0 left-0 w-full">
          {hours.map((hour) => (
            <div
              key={hour}
              className="border-b border-gray-100 w-full flex"
              style={{ height: `${60 * PIXELS_PER_MINUTE}px` }}
            >
              <div className="w-16 text-right pr-3 text-xs text-gray-400 -mt-2 bg-white">
                {hour}:00
              </div>
              {/* Line */}
              <div className="flex-1 border-l border-gray-100 relative"></div>
            </div>
          ))}
        </div>

        {/* Task blocks */}
        {tasks.map((task) => {
          const startMinutes = timeToMinutes(task.startTime);
          const endMinutes = timeToMinutes(task.endTime);
          const offsetMinutes = startMinutes - START_HOUR * 60;
          const durationMinutes = endMinutes - startMinutes;

          if (offsetMinutes < 0) return null;

          return (
            <div
              key={task.id}
              onClick={() => deleteTask(task.id)}
              className={`absolute left-16 right-4 rounded-md border-l-4 p-2 text-xs md:text-sm cursor-pointer hover:opacity-90 hover:line-through transition-opacity shadow-sm overflow-hidden ${task.color}`}
              style={{
                top: `${offsetMinutes * PIXELS_PER_MINUTE}px`,
                height: `${durationMinutes * PIXELS_PER_MINUTE}px`,
                zIndex: 10,
              }}
            >
              <div className="font-bold">{task.text}</div>
              <div className="opacity-75 text-[10px]">
                {task.startTime} - {task.endTime}
              </div>
            </div>
          );
        })}

        <div style={{ height: `${hours.length * 60 * PIXELS_PER_MINUTE}px` }} />
      </div>
    </div>
  );
}
