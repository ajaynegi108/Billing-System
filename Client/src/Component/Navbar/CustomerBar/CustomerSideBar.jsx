import React, { useState } from "react";
import { AiTwotoneDashboard } from "react-icons/ai";
import { TbFileInvoice } from "react-icons/tb";
import { AiOutlineProduct } from "react-icons/ai";

import { FaRegUser } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { MdKeyboardArrowDown } from "react-icons/md"; // Dropdown icon
import { NavLink } from "react-router-dom";
import { IoMdDownload } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";

import { MdHistory } from "react-icons/md";

export default function CustomerSideBar() {
  const [isInvoicesOpen, setInvoicesOpen] = useState(false);
  const [isProductsOpen, setProductsOpen] = useState(false);
  const [isCustomersOpen, setCustomersOpen] = useState(false);
  const [isUsersOpen, setUsersOpen] = useState(false);
  const [isTemplateOpen, setTemplateOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true); // State for sidebar visibility

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex">
      <div className="bg-gray-800 text-white px-2 h-screen w-8">
        <GiHamburgerMenu onClick={toggleSidebar} className="cursor-pointer" />
      </div>
      {isSidebarOpen && (
        <nav className="bg-gray-800 text-white text-start h-screen w-56">
          <ul className="space-y-1 p-2">
            <li>
              <NavLink
                to="dashboard"
                className="flex items-center hover:bg-gray-700 p-2 rounded"
              >
                <AiTwotoneDashboard className="mr-2" /> Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="invoice"
                className="flex items-center hover:bg-gray-700 p-2 rounded"
              >
                <TbFileInvoice className="mr-2" /> Invoices
              </NavLink>
            </li>
            <li>
              <NavLink
                to="servicelist"
                className="flex items-center hover:bg-gray-700 p-2 rounded"
              >
                <AiOutlineProduct className="mr-2" /> Services
              </NavLink>
            </li>
            <li>
              <NavLink
                to="paymenthistory"
                className="flex items-center hover:bg-gray-700 p-2 rounded"
              >
                <MdHistory className="mr-2" /> Payment History
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
