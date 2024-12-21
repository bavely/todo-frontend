"use client";
import React, { useEffect } from "react";
import TaskForm from "@/components/TaskForm";
import { useTasks } from "@/hooks/useTasks";
import { useRouter } from "next/navigation";

const Create = () => {
  const { loading, error, userMsg, createTask, setUserMsg } = useTasks();

  const router = useRouter();

  const handleCreateTask = async (
    title: string,
    color: string,
    completed: boolean
  ) => {
    const task = { title, color, completed };
    await createTask(task);
  };

  useEffect(() => {
    if (userMsg) {
      setTimeout(() => {
        setUserMsg(null);
        router.push("/");
      }, 3000);
    }
  }, [userMsg]);

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <>
      {userMsg && <p className="text-green-500">{userMsg}</p>}
      <TaskForm
        handleAction={handleCreateTask}
        thistask={{ title: "", color: "", completed: false }}
      />
    </>
  );
};

export default Create;
