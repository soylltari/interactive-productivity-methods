interface AddTaskProps {
  placeholder?: string;
  inputValue: string;
  setInputValue: (newValue: string) => void;
  onAdd: () => void;
  buttonText?: string;
}

export default function AddTask({
  placeholder,
  inputValue,
  setInputValue,
  onAdd,
  buttonText = "Add Task",
}: AddTaskProps) {
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      onAdd();
    }
  }
  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        value={inputValue}
        placeholder={placeholder}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="bg-white border-0 shadow-sm shadow-blue-100 rounded-full focus:outline-none px-5 py-2"
        aria-label="Task input"
      />
      <button
        onClick={onAdd}
        className="bg-green-400 text-gray-50 rounded-full p-2 hover:bg-green-500 transition-colors shadow-sm"
      >
        {buttonText}
      </button>
    </div>
  );
}
