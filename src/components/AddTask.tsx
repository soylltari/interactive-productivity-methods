interface AddTaskProps {
  placeholder?: string;
  inputValue: string;
  setInputValue: (newValue: string) => void;
  onAdd: () => void; // New prop to handle the click
  buttonText?: string; // New prop to change button label
}

export default function AddTask({
  placeholder,
  inputValue,
  setInputValue,
  onAdd,
  buttonText = "Add Task", // Default text if none provided
}: AddTaskProps) {
  // We removed the internal 'useState'.
  // Now this component is "Controlled" entirely by the parent.

  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        value={inputValue}
        placeholder={placeholder}
        onChange={(e) => setInputValue(e.target.value)}
        className="bg-white border-0 shadow-sm shadow-blue-100 rounded-full focus:outline-none px-5 py-2"
      />
      <button
        onClick={onAdd}
        className="bg-green-400 text-gray-50 rounded-full p-2 hover:bg-green-500 transition-colors"
      >
        {buttonText}
      </button>
    </div>
  );
}
