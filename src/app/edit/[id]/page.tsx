/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTasks } from "@/hooks/useTasks";
import TaskForm from "@/components/TaskForm";
import { Task } from "@/lib/api";
const Edit = () => {
  const pathname = usePathname();
  const [id, setId] = useState("");
  const [task, setTask] = useState<Task | null>(null);
  const [localUserMsg, setLocalUserMsg] = useState({
    message: "",
    type: "",
  });
  const { loading, error, userMsg, setUserMsg, fetchTaskById, updateTask } =
    useTasks();

  useEffect(() => {
    setId(pathname.split("/")[2]);
  }, [pathname]);

  useEffect(() => {
    if (id) {
      fetchTaskById(parseInt(id))
        .then((res) => {
          setTask(res);
        })
        .catch((err) => {
          setLocalUserMsg({ message: err.message, type: "error" });
        });
    }
  }, [id]);
  const handleUpdateTask = async (title: string, color: string) => {
    try {
      await updateTask(parseInt(id), { title, color });
      setUserMsg("Task updated successfully");
    } catch (err: any) {
      setLocalUserMsg({ message: err.message, type: "error" });
    }
  };

  useEffect(() => {
    if (userMsg) {
      setTimeout(() => {
        setUserMsg(null);
      }, 3000);
    }
  }, [userMsg]);

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <>
      {userMsg && <p className="text-green-500">{userMsg}</p>}
      {localUserMsg.message && (
        <p
          className={
            localUserMsg.type === "error" ? "text-red-500" : "text-green-500"
          }
        >
          {localUserMsg.message}
        </p>
      )}
      <TaskForm
        handleAction={handleUpdateTask}
        thistask={task ?? { title: "", color: "", completed: false }}
      />
    </>
  );
};

export default Edit;
