/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Task, fetchAllTasks, createNewTask, updateATask, deleteATask, fetchATask } from "@/lib/api";



interface UseTasksResult {
  userMsg: string | null;
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  fetchTaskById: (id: number) => Promise<Task | null>;
  createTask: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => Promise<void>;
  updateTask: (id: number, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  setUserMsg: React.Dispatch<React.SetStateAction<string | null>>;
}



export const useTasks = (): UseTasksResult => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userMsg, setUserMsg] = useState<string | null>(null);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchAllTasks();
      setTasks(response);
    } catch (err: any) {
      setError(err.message || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const fetchTaskById = async (id: number): Promise<Task | null> => {
    try {
      const response = await fetchATask(id);
      return response ?? null; // return null if response is undefined
    } catch (err: any) {
      setError(err.message || "Failed to fetch task");
      return null; // return null if an error occurs
    }
  };

  const createTask = async (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    setError(null);

    try {
      const response = await createNewTask(task);
      setTasks((prev) => [...prev, response]);
      setUserMsg("Task created successfully");
    } catch (err: any) {
      setError(err.message || "Failed to create task");
    }
  };

  const updateTask = async (id: number, updates: Partial<Task>) => {
    setError(null);

    try {
      const response = await updateATask(id, updates);
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? { ...task, ...response } : task))
      );
    } catch (err: any) {
      setError(err.message || "Failed to update task");
    }
  };

  const deleteTask = async (id: number) => {
    setError(null);

    try {
      await deleteATask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err: any) {
      setError(err.message || "Failed to delete task");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    userMsg,
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    fetchTaskById,
    setUserMsg
  };
};
