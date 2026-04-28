import { useMemo, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  editTask,
  deleteTask,
  toggleTask,
  setFilter,
} from "./features/tasks/taskSlice.js";
import Header from "./components/Header.jsx";
import TaskForm from "./components/TaskForm.jsx";
import FilterBar from "./components/FilterBar.jsx";
import TaskList from "./components/TaskList.jsx";
import EmptyState from "./components/EmptyState.jsx";

const priorityOptions = ["High", "Medium", "Low"];

function App() {
  // Dispatch and state selectors
  const dispatch = useDispatch();
  const { tasks, filter } = useSelector((state) => state.tasks);
  const [editingTask, setEditingTask] = useState(null);

  const filteredTasks = useMemo(() => {
    let tasksToShow = tasks;

    if (filter === "Completed") {
      tasksToShow = tasks.filter((task) => task.completed);
    } else if (filter === "Pending") {
      tasksToShow = tasks.filter((task) => !task.completed);
    } else if (filter !== "All") {
      tasksToShow = tasks.filter((task) => task.priority === filter);
    }

    return [...tasksToShow].sort(
      (a, b) => Number(a.completed) - Number(b.completed),
    );
  }, [tasks, filter]);

  const stats = useMemo(
    () => ({
      completed: tasks.filter((task) => task.completed).length,
      pending: tasks.length - tasks.filter((task) => task.completed).length,
    }),
    [tasks],
  );

  const handleAdd = useCallback(
    (taskData) => {
      dispatch(addTask(taskData));
      setEditingTask(null);
    },
    [dispatch],
  );

  const handleEdit = useCallback(
    (taskData) => {
      dispatch(editTask(taskData));
      setEditingTask(null);
    },
    [dispatch],
  );

  const handleSubmit = useCallback(
    (taskData) => {
      if (editingTask) {
        handleEdit({ ...editingTask, ...taskData });
      } else {
        handleAdd(taskData);
      }
    },
    [editingTask, handleAdd, handleEdit],
  );

  const handleEditClick = useCallback((task) => {
    setEditingTask(task);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleCancelEdit = useCallback(() => {
    setEditingTask(null);
  }, []);

  const handleToggle = useCallback(
    (id) => dispatch(toggleTask(id)),
    [dispatch],
  );

  const handleDelete = useCallback(
    (id) => dispatch(deleteTask(id)),
    [dispatch],
  );

  const handleFilterChange = useCallback(
    (value) => dispatch(setFilter(value)),
    [dispatch],
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-slate-100 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Header
          total={tasks.length}
          completed={stats.completed}
          pending={stats.pending}
        />

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_1.45fr] animate-fade-in">
          <div className="rounded-2xl border border-slate-200/60 bg-white/80 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:shadow-slate-300/50">
            <TaskForm
              key={editingTask ? editingTask.id : "new"}
              onSubmit={handleSubmit}
              initialData={editingTask}
              priorities={priorityOptions}
              onCancel={handleCancelEdit}
            />
          </div>

          <div className="rounded-2xl border border-slate-200/60 bg-white/80 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-xl transition-all duration-300">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Task Board
                </h2>
              </div>
              <FilterBar selected={filter} onSelect={handleFilterChange} />
            </div>

            <div className="transition-all duration-300">
              {filteredTasks.length === 0 ? (
                <EmptyState filter={filter} />
              ) : (
                <TaskList
                  tasks={filteredTasks}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                  onEdit={handleEditClick}
                />
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
