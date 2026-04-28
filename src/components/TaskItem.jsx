import { memo } from "react";
import { Edit3, Trash2, CheckCircle } from "lucide-react";

const priorityStyles = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-amber-100 text-amber-700",
  Low: "bg-emerald-100 text-emerald-700",
};

const TaskItem = memo(function TaskItem({ task, onToggle, onDelete, onEdit }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            className="h-5 w-5"
          />

          <span
            className={`text-lg font-medium ${
              task.completed ? "text-slate-400 line-through" : "text-slate-900"
            }`}
          >
            {task.title}
          </span>
        </label>

        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${priorityStyles[task.priority]}`}
        >
          {task.priority}
        </span>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onEdit(task)}
          className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm hover:bg-slate-200"
        >
          <Edit3 className="h-4 w-4" />
          Edit
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="flex items-center gap-2 rounded-lg bg-red-100 px-3 py-2 text-sm text-red-700 hover:bg-red-200"
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </button>
      </div>
    </article>
  );
});

export default TaskItem;
