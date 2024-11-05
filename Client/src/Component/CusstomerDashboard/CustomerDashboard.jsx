import React from "react";
import CustomerSideBar from "../Navbar/CustomerBar/CustomerSideBar";
import { Outlet } from "react-router-dom";

export default function CustomerDashboard() {
  return (
    <div className="flex h-screen overflow-scroll">
      <div>
        <CustomerSideBar />
      </div>
      <div className="w-full p-4">
        <Outlet />
      </div>
    </div>
  );
}
