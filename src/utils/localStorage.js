const STORAGE_KEY = "task_manager_tasks_v1";

export function loadTasks() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch (error) {
    console.error("Failed to load tasks from localStorage", error);
  }
  return [];
}

export function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Failed to save tasks to localStorage", error);
  }
}
