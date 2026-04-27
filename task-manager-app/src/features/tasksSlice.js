import { createSlice } from '@reduxjs/toolkit';

// Load tasks from localStorage
const loadTasks = () => {
  try {
    const serializedTasks = localStorage.getItem('tasks');
    if (serializedTasks === null) {
      return [];
    }
    return JSON.parse(serializedTasks);
  } catch (err) {
    return [];
  }
};

// Save tasks to localStorage
const saveTasks = (tasks) => {
  try {
    const serializedTasks = JSON.stringify(tasks);
    localStorage.setItem('tasks', serializedTasks);
  } catch (err) {
    console.error('Could not save tasks', err);
  }
};

const initialState = {
  tasks: loadTasks(),
  filter: 'all', // all, pending, completed
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now().toString(),
        title: action.payload.title,
        description: action.payload.description || '',
        status: 'pending',
        createdAt: new Date().toISOString(),
        createdBy: action.payload.createdBy,
      };
      state.tasks.push(newTask);
      saveTasks(state.tasks);
    },
    updateTask: (state, action) => {
      const { id, ...updates } = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...updates };
        saveTasks(state.tasks);
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      saveTasks(state.tasks);
    },
    toggleTaskStatus: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.status = task.status === 'pending' ? 'completed' : 'pending';
        saveTasks(state.tasks);
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  toggleTaskStatus,
  setFilter,
} = tasksSlice.actions;

export default tasksSlice.reducer;

// Selectors
export const selectAllTasks = (state) => state.tasks.tasks;
export const selectFilter = (state) => state.tasks.filter;

// Memoized selector for filtered tasks (to be used with useMemo in components)
export const selectFilteredTasks = (state) => {
  const tasks = state.tasks.tasks;
  const filter = state.tasks.filter;
  
  if (filter === 'all') return tasks;
  if (filter === 'pending') return tasks.filter(task => task.status === 'pending');
  if (filter === 'completed') return tasks.filter(task => task.status === 'completed');
  return tasks;
};

// Selector for task statistics
export const selectTaskStats = (state) => {
  const tasks = state.tasks.tasks;
  return {
    total: tasks.length,
    pending: tasks.filter(task => task.status === 'pending').length,
    completed: tasks.filter(task => task.status === 'completed').length,
  };
};