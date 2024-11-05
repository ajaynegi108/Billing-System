import React from "react";
import Sidebar from "../Navbar/Sidebar";
import Topnavbar from "../Navbar/Topnavbar";
import Dashboard from "../Dashboard/Dashboard";
import { Outlet } from "react-router-dom";
export default function Home() {
  return (
    <>
      <Topnavbar />
      <div className="flex h-screen overflow-scroll">
        <div className="">
          <Sidebar />
        </div>
        <div className="w-full p-4">
          <Outlet />
        </div>
      </div>
    </>
  );
}
