import React from "react";
import { ModeToggle } from "./modeTog";
import {Rocket } from "lucide-react";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 border-b border-gray-300 bg-slate-100 dark:bg-slate-900">
      
      <h1 className="text-2xl font-bold flex flex-row space-x-2"> <Rocket className="h-10 w-10" /> <span className="text-3xl text-blue-500">ToDo </span> <span className="text-3xl text-blue-400"> App </span></h1>
      <ModeToggle />
    </header>
  );
};

export default Header;
