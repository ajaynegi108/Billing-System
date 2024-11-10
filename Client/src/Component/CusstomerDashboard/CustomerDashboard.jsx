import React from "react";
import CustomerSideBar from "../Navbar/CustomerBar/CustomerSideBar";
import { Outlet } from "react-router-dom";
import CustomerTopbar from "../Navbar/CustomerBar/CustomerTopBar";

export default function CustomerDashboard() {
  return (
    <>
      <CustomerTopbar />
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
