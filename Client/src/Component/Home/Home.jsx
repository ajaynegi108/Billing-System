import React from "react";
import Sidebar from "../Navbar/Sidebar";
import Dashboard from "../Dashboard/Dashboard";
import { Outlet } from "react-router-dom";
export default function Home() {
  return (
    <div className="flex h-screen w-screen">
      <div className="">
        <Sidebar />
      </div>
      <div className="w-full p-4">
        <Outlet />
      </div>
    </div>
  );
}
