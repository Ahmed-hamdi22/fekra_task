import { useEffect, useState, useCallback } from "react";
import { PlusCircle, CheckSquare } from "lucide-react";

function TaskForm({ onSubmit, initialData, priorities, onCancel }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [touched, setTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setTouched(true);
      if (!isValid) return;

      setIsSubmitting(true);
      try {
        onSubmit({ title: title.trim(), priority });
        setTitle("");
        setPriority("Medium");
        setTouched(false);
      } finally {
        setIsSubmitting(false);
      }
    },
    [isValid, onSubmit, title, priority],
  );

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-slate-900 via-slate-950 to-slate-950 p-6 shadow-xl text-slate-50">
        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-indigo-500/10 blur-2xl" />
        <div className="relative z-10 flex items-start gap-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-300">
            {initialData ? (
              <CheckSquare className="h-6 w-6" />
            ) : (
              <PlusCircle className="h-6 w-6" />
            )}
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-300">
              {initialData ? "Update" : "Create"} Task
            </p>
            <h2 className="mt-1 text-2xl font-bold text-white">
              {initialData ? "Edit task" : "Add new task"}
            </h2>
          </div>
        </div>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">
            Task title
          </label>
          <input
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition duration-200 placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 disabled:bg-slate-50 disabled:text-slate-500"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            onBlur={() => setTouched(true)}
            placeholder="Enter task title"
            aria-label="Task title"
            disabled={isSubmitting}
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">
            Priority level
          </label>
          <select
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition duration-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 disabled:bg-slate-50 disabled:text-slate-500"
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
            disabled={isSubmitting}
          >
            {priorities.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition-all duration-200 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/30 disabled:cursor-not-allowed disabled:opacity-50 active:scale-95"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              </>
            ) : (
              <>{initialData ? "Save Changes" : "Add Task"}</>
            )}
          </button>
          {initialData && (
            <button
              type="button"
              className="rounded-xl border-2 border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-900 transition-all duration-200 hover:bg-slate-50 hover:border-slate-300 active:scale-95 disabled:opacity-50"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          )}
        </div>

        {!isValid && touched && (
          <div className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            Please enter a task title
          </div>
        )}
      </form>
    </div>
  );
}

export default TaskForm;
