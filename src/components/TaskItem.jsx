import { memo } from "react";
import { Edit3, Trash2, CheckCircle } from "lucide-react";

const TaskItem = memo(function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      onDelete(task.id);
    }
  };

  const priorityStyles = {
    High: "bg-red-100/80 text-red-700 ring-red-200",
    Medium: "bg-amber-100/80 text-amber-700 ring-amber-200",
    Low: "bg-emerald-100/80 text-emerald-700 ring-emerald-200",
  };

  return (
    <article
      className={`group relative overflow-hidden rounded-[1.5rem] border transition-all duration-300 ${
        task.completed
          ? "border-slate-200/50 bg-slate-100/80 shadow-sm opacity-80"
          : "border-slate-200 bg-white shadow-md hover:shadow-lg hover:shadow-slate-200/50"
      }`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-r from-indigo-500/0 to-indigo-500/0 opacity-0 transition-opacity duration-300 ${
          !task.completed
            ? "group-hover:from-indigo-500/5 group-hover:to-transparent group-hover:opacity-100"
            : ""
        }`}
      />

      <div className="relative z-10 space-y-4 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex items-center gap-4">
            <div className="relative flex h-6 w-6 items-center justify-center rounded-lg border-2 border-slate-300 bg-white transition-all duration-200 hover:border-indigo-400">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id)}
                className="absolute h-full w-full cursor-pointer appearance-none rounded-lg"
              />
              {task.completed && (
                <CheckCircle className="h-5 w-5 text-indigo-600" />
              )}
            </div>
            <span
              className={`max-w-xl text-lg font-semibold transition-all duration-300 ${
                task.completed
                  ? "text-slate-500 line-through"
                  : "text-slate-900"
              }`}
              aria-label={task.completed ? "Completed task" : "Pending task"}
            >
              {task.title}
            </span>
          </label>

          <span
            className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider ring-1 transition-all duration-300 ${priorityStyles[task.priority]}`}
          >
            {task.priority}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-2">
          <button
            type="button"
            onClick={() => onEdit(task)}
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 transition-all duration-200 hover:bg-indigo-100 hover:text-indigo-700 active:scale-95"
          >
            <Edit3 className="h-3.5 w-3.5" />
            Edit
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="inline-flex items-center gap-2 rounded-2xl bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition-all duration-200 hover:bg-red-100 active:scale-95"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete
          </button>
        </div>
      </div>
    </article>
  );
});

export default TaskItem;
