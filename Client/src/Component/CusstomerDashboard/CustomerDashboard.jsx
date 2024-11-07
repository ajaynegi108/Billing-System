import React from "react";
import CustomerSideBar from "../Navbar/CustomerBar/CustomerSideBar";
import { Outlet } from "react-router-dom";
import Topnavbar from "../Navbar/Topnavbar";

export default function CustomerDashboard() {
  return (
    <>
      <Topnavbar />
      <div className="flex h-screen overflow-scroll">
        <div>
          <CustomerSideBar />
        </div>
        <div className="w-full p-4">
          <Outlet />
        </div>
      </div>
    </>
  );
}
