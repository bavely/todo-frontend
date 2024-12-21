"use client";
import React from "react";
import { useTasks } from "../hooks/useTasks";
import Link from "next/link";
import TaskCard from "@/components/TaskCard";
import Header from "@/components/header";
export default function Home() {
  const { tasks, loading, error, updateTask, deleteTask } = useTasks();

  const handleToggleCompleted = async (id: number, completed: boolean) => {
    await updateTask(id, { completed: !completed });
  };

  const handleDeleteTask = async (id: number) => {
    if (confirm("Are you sure you want to delete this task?")) {
      await deleteTask(id);
    }
  };
  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Header />

      <div className="my-4 ">
        <Link
          href="/create"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Task
        </Link>
      </div>

      <div className="mt-4 text-sm text-gray-600 flex justify-between">
        <p className="text-gray-600 dark:text-gray-400 font-bold ">
          Tasks: {tasks.length}
        </p>
        <p className="text-slate-900 dark:text-slate-300 font-bold ">
          Completed: {tasks.filter((task) => task.completed).length} of{" "}
          {tasks.length}
        </p>
      </div>

      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`p-4 border rounded flex justify-between items-center ${`border-[${task.color}]/50`}`}
          >
            <TaskCard
              task={task}
              handleToggleCompleted={handleToggleCompleted}
              handleDeleteTask={handleDeleteTask}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
