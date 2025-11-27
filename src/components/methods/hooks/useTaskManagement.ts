import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { Task } from "@/definitions";

interface TaskConfig {
  maxTasks?: number; // Limit tasks
  defaultText?: string;
  initialUrgency?: string; // For Eisenhower
}

export function useTaskManagement<T extends Task>(
  storageKey: string,
  config: TaskConfig = {}
) {
  const [tasks, setTasks] = useLocalStorage<T[]>(storageKey, []);

  const [inputValue, setInputValue] = useState("");
  const { maxTasks, defaultText, initialUrgency } = config;
  const [urgency, setUrgency] = useState(
    initialUrgency || "notImportantNotUrgent"
  );

  function addTask(customUrgency?: string) {
    if (maxTasks !== undefined && tasks.length >= maxTasks) {
      return;
    }

    if (!inputValue.trim()) {
      if (!defaultText) {
        return;
      }
    }

    const taskText = inputValue.trim() || defaultText || "";

    const newTask = {
      id: Date.now(),
      text: taskText,
      urgency: customUrgency || urgency,
    } as unknown as T;

    setTasks([...tasks, newTask]);
    setInputValue("");
  }

  function deleteTask(taskId: number) {
    setTasks(tasks.filter((t) => t.id !== taskId));
  }

  return {
    tasks,
    setTasks,
    inputValue,
    setInputValue,
    urgency,
    setUrgency,
    addTask,
    deleteTask,
  };
}
