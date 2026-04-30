import TaskItem from "./TaskItem.jsx";

function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="space-y-8">
      {pendingTasks.length > 0 && (
        <section className="space-y-4">
          {completedTasks.length > 0 && (
            <div className="rounded-2xl border border-slate-200 bg-slate-100/80 px-4 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-slate-600">
              Pending tasks
            </div>
          )}
          <div className="space-y-4">
            {pendingTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </div>
        </section>
      )}

      {completedTasks.length > 0 && (
        <section className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-100/80 px-4 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-slate-600">
            Completed tasks
          </div>
          <div className="space-y-4">
            {completedTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default TaskList;
