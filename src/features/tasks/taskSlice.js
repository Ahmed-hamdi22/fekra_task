import { createSlice } from "@reduxjs/toolkit";
import { loadTasks, saveTasks } from "../../utils/localStorage.js";

const initialState = {
  tasks: loadTasks(),
  filter: "All",
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,

  reducers: {
    addTask(state, action) {
      const nextId = state.tasks.length
        ? Math.max(...state.tasks.map((task) => task.id)) + 1
        : 1;

      state.tasks.push({
        id: nextId,
        title: action.payload.title,
        priority: action.payload.priority,
        completed: false,
      });

      saveTasks(state.tasks);
    },

    editTask(state, action) {
      const task = state.tasks.find((task) => task.id === action.payload.id);

      if (task) {
        task.title = action.payload.title;
        task.priority = action.payload.priority;

        saveTasks(state.tasks);
      }
    },

    deleteTask(state, action) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);

      saveTasks(state.tasks);
    },

    toggleTask(state, action) {
      const task = state.tasks.find((task) => task.id === action.payload);

      if (task) {
        task.completed = !task.completed;

        saveTasks(state.tasks);
      }
    },

    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

export const { addTask, editTask, deleteTask, toggleTask, setFilter } =
  taskSlice.actions;

export default taskSlice.reducer;
