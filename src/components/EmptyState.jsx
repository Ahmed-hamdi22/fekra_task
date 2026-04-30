import { memo } from "react";
import { Inbox } from "lucide-react";

const EmptyState = memo(function EmptyState({ filter }) {
  const message =
    filter === "All"
      ? "There are no tasks yet."
      : filter === "Pending"
        ? "There are no pending tasks yet."
        : filter === "Completed"
          ? "There are no completed tasks yet."
          : `There are no ${filter.toLowerCase()} priority tasks yet.`;

  return (
    <div className="flex flex-col items-center justify-center rounded-[1.8rem] border border-dashed border-slate-300 bg-gradient-to-br from-slate-50 to-slate-100 py-20 px-6 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100/80 text-indigo-600 shadow-lg shadow-indigo-200/30">
        <Inbox className="h-10 w-10" />
      </div>
      <h3 className="text-2xl font-bold text-slate-900">No tasks found</h3>
      <p className="mt-3 max-w-md text-base leading-7 text-slate-600">
        {message} Add a new task to populate your board.
      </p>
      <div className="mt-6 text-sm font-medium text-slate-500">
        Let's get organized!
      </div>
    </div>
  );
});

export default EmptyState;
