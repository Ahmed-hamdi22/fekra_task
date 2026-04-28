import { Inbox } from "lucide-react";

function EmptyState({ filter }) {
  const message =
    filter === "All"
      ? "There are no tasks yet."
      : filter === "Pending"
        ? "There are no pending tasks yet."
        : filter === "Completed"
          ? "There are no completed tasks yet."
          : `There are no ${filter.toLowerCase()} priority tasks yet.`;

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
      <div className="mb-4 rounded-full bg-indigo-100 p-5 text-indigo-600">
        <Inbox className="h-8 w-8" />
      </div>

      <h3 className="text-2xl font-bold text-slate-900">No tasks found</h3>

      <p className="mt-3 max-w-md text-slate-600">{message}</p>
    </div>
  );
}

export default EmptyState;
