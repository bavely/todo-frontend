import React from "react";
import { Task } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {Trash2, Edit } from "lucide-react";

const TaskCard = (props: {
  task: Task;
  handleToggleCompleted: (id: number, completed: boolean) => Promise<void>;
  handleDeleteTask: (id: number) => Promise<void>;
}) => {
  const { task, handleToggleCompleted, handleDeleteTask } = props;

  const router = useRouter();

  return (
    <>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => handleToggleCompleted(task.id, task.completed)}
      />
      <div
        className=" w-full min-w-full flex flex-row items-center justify-between cursor-pointer mx-4 "
        onClick={() => {
          router.push(`/edit/${task.id}`);
        }}
      >
        <div className="flex items-center space-x-4 basis-3/4">
          <span
            className={`  text-lg font-medium ${
              task.completed ? "line-through text-gray-500" : ""
            }`}
          >
            {task.title}
          </span>
        </div>

        <div className="space-x-4  basis-1/4 flex items-center justify-center">
          <Link
            href={`/edit/${task.id}`}
            className="text-blue-500 hover:underline"
          >
            <Edit className="h-4 w-4" />
          </Link>
          <button
            onClick={() => handleDeleteTask(task.id)}
            className="text-red-500 hover:underline"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );
};

export default TaskCard;
