import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchTasks, addTaskAPI, updateTaskAPI, deleteTaskAPI } from '../api';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskText) => {
    try {
      const newTask = await addTaskAPI({
        title: taskText,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      setTasks([...tasks, newTask]);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const toggleComplete = async (id) => {
    try {
      const taskToUpdate = tasks.find(task => task.id === id);
      const updatedTask = await updateTaskAPI(id, {
        ...taskToUpdate,
        completed: !taskToUpdate.completed,
        updatedAt: new Date().toISOString()
      });
      setTasks(tasks.map(task => task.id === id ? updatedTask : task));
    } catch (err) {
      setError(err.message);
    }
  };

  const updateTask = async (id, updatedText) => {
    try {
      const taskToUpdate = tasks.find(task => task.id === id);
      const updatedTask = await updateTaskAPI(id, {
        ...taskToUpdate,
        title: updatedText,
        updatedAt: new Date().toISOString()
      });
      setTasks(tasks.map(task => task.id === id ? updatedTask : task));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteTaskAPI(id);
      setTasks(tasks.filter(task => task.id !== id));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <TaskContext.Provider value={{
      tasks,
      loading,
      error,
      loadTasks,
      addTask,
      toggleComplete,
      updateTask,
      deleteTask
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);