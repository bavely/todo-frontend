import axios from "axios";

const API_URL = "http://localhost:5000/tasks";

export interface Task {
  id: number;
  title: string;
  color: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export const fetchAllTasks = async (): Promise<Task[]> => {
  const response = await axios.get<Task[]>(API_URL);
  return response.data;
};

export const fetchATask = async (id: number): Promise<Task> => {
  const response = await axios.get<Task>(`${API_URL}/${id}`);
  return response.data;
};

export const createNewTask = async (
  task: Omit<Task, "id" | "createdAt" | "updatedAt">
): Promise<Task> => {
  const response = await axios.post<Task>(API_URL, task);
  return response.data;
};

export const updateATask = async (
  id: number,
  updates: Partial<Task>
): Promise<Task> => {
  const response = await axios.put<Task>(`${API_URL}/${id}`, updates);
  return response.data;
};

export const deleteATask = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
