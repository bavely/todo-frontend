"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/header";
import { useTasks } from "@/hooks/useTasks";
import { redirect } from "next/navigation";

const TaskForm = (props: {
  thistask: { title: string; color: string; completed: boolean };
  handleAction: (title: string, color: string, completed: boolean) => void;
}) => {
  const { handleAction, thistask } = props;
  const { loading, error, userMsg, setUserMsg } = useTasks();

  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");
  const [localUserMsg, setLocalUserMsg] = useState({
    message: "",
    type: "",
  });

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const colors = [
  
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#fbbf24",
 
  "#0ea5e9",
  "#1d4ed8",
  "#818cf8"


  ];

  useEffect(() => {
    if (thistask.title && thistask.color) {
      setTitle(thistask.title);
      setColor(thistask.color);
    }
  }, [thistask]);

  const handleTask = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalUserMsg({ message: "", type: "" });
    if (!title) {
      setLocalUserMsg({ message: "Please enter a title", type: "error" });
      return;
    }
    if (!color) {
      setLocalUserMsg({ message: "Please select a color", type: "error" });
      return;
    }
    const task = { title, color, completed: false };
    handleAction(task.title, task.color, task.completed);
  };

  useEffect(() => {
    if (userMsg === "Task created successfully") {
      setTimeout(() => {
        setUserMsg(null);

        redirect("/");
      }, 3000);
    }
  }, [userMsg]);

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Header />
      <div className="flex flex-col space-y-4 items-start ">
        {userMsg && (
          <p
            className={`${
              localUserMsg.type === "error" ? "text-red-500" : "text-green-500"
            }`}
          >
            {userMsg}
          </p>
        )}
        {localUserMsg.message && (
          <p
            className={`${
              localUserMsg.type === "error" ? "text-red-500" : "text-green-500"
            }`}
          >
            {localUserMsg.message}
          </p>
        )}
        <Link href="/">
          {" "}
          <ArrowLeft />
        </Link>
        <div className="flex flex-col space-y-4  items-center w-full ">
        <input
          type="text"
          placeholder="Task title"
          className="border border-gray-300 rounded px-2 py-1 w-full "
          value={title}
          onChange={handleTitleChange}
        />
        <ul className="border border-gray-300 rounded px-2 py-1 flex space-x-4 w-full">
          {colors.map((el) => (
            <li
              key={el}
              style={{
                backgroundColor: el,
                border: color === el ? `2px solid black` : "none",
              }}
              className="w-12 h-12 rounded-full cursor-pointer  "
              onClick={() => {
                setColor(el);
              }}
            />
          ))}
        </ul>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded w-full "
          onClick={handleTask}
          disabled={title === "" || color === ""}
        >
          {title === "" && color === "" ? "Create Task" : "Save Task"}
        </button>
        </div>
      </div>
    </div>
  );
};
export default TaskForm;
