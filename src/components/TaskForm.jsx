import { useEffect, useState } from "react";

function TaskForm({ onSubmit, initialData, priorities, onCancel }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setPriority(initialData.priority);
    } else {
      setTitle("");
      setPriority("Medium");
    }
  }, [initialData]);

  const isValid = title.trim().length > 0;

  const handleSubmit = (event) => {
    event.preventDefault();

    setTouched(true);

    if (!isValid) return;

    onSubmit({
      title: title.trim(),
      priority,
    });

    setTitle("");
    setPriority("Medium");
    setTouched(false);
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          {initialData ? "Edit Task" : "Add Task"}
        </h2>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Task Title</label>

        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          onBlur={() => setTouched(true)}
          placeholder="Enter task title"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Priority</label>

        <select
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
        >
          {priorities.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {!isValid && touched && (
        <p className="text-sm text-red-600">Please enter a task title.</p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          className="rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white hover:bg-indigo-700"
        >
          {initialData ? "Save Changes" : "Add Task"}
        </button>

        {initialData && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-slate-300 px-5 py-3 font-medium text-slate-700 hover:bg-slate-100"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
