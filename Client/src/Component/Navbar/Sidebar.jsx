import React, { useState } from "react";
import { AiTwotoneDashboard } from "react-icons/ai";
import { TbFileInvoice } from "react-icons/tb";
import { AiOutlineProduct } from "react-icons/ai";
import { SlPeople } from "react-icons/sl";
import { FaRegUser } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { MdKeyboardArrowDown } from "react-icons/md"; // Dropdown icon
import { NavLink } from "react-router-dom";
import { IoMdDownload } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImInsertTemplate } from "react-icons/im";

export default function Sidebar() {
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
    <>
      <div className="flex">
        <div className="bg-gray-800 text-white px-2 h-screen w-8">
          <GiHamburgerMenu onClick={toggleSidebar} className="cursor-pointer" />
        </div>
        {isSidebarOpen && (
          <nav className="bg-gray-800 text-white text-start h-screen w-56">
            <ul className="space-y-1 p-2">
              <li>
                <NavLink
                  to="/home/dashboard"
                  className="flex items-center hover:bg-gray-700 p-2 rounded"
                >
                  <AiTwotoneDashboard className="mr-2" /> Dashboard
                </NavLink>
              </li>
              <li>
                <button
                  onClick={() => setInvoicesOpen(!isInvoicesOpen)}
                  className="flex items-center justify-between w-full text-left hover:bg-gray-700 p-2 rounded"
                >
                  <span className="flex items-center">
                    <TbFileInvoice className="mr-2" /> Invoices
                  </span>
                  <MdKeyboardArrowDown
                    className={`transition-transform ${
                      isInvoicesOpen ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                {isInvoicesOpen && (
                  <ul className="ml-4 space-y-1">
                    <li>
                      <NavLink
                        to="/home/createinvoice"
                        className="block hover:bg-gray-600 p-2 rounded"
                      >
                        <span className="flex items-center">
                          <FaPlus className="mr-2" /> Create Invoice
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/home/manageinvoice"
                        className="block hover:bg-gray-600 p-2 rounded"
                      >
                        <span className="flex items-center">
                          <CiSettings className="mr-2" /> Manage Invoices
                        </span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <button
                  onClick={() => setProductsOpen(!isProductsOpen)}
                  className="flex items-center justify-between w-full text-left hover:bg-gray-700 p-2 rounded"
                >
                  <span className="flex items-center">
                    <AiOutlineProduct className="mr-2" /> Products
                  </span>
                  <MdKeyboardArrowDown
                    className={`transition-transform ${
                      isProductsOpen ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                {isProductsOpen && (
                  <ul className="ml-4 space-y-2">
                    <li>
                      <NavLink
                        to="/home/addproduct"
                        className="block hover:bg-gray-600 p-2 rounded"
                      >
                        <span className="flex items-center">
                          <FaPlus className="mr-2" /> Add Product
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/home/manageproduct"
                        className="block hover:bg-gray-600 p-2 rounded"
                      >
                        <span className="flex items-center">
                          <CiSettings className="mr-2" /> Manage Products
                        </span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <button
                  onClick={() => setCustomersOpen(!isCustomersOpen)}
                  className="flex items-center justify-between w-full text-left hover:bg-gray-700 p-2 rounded"
                >
                  <span className="flex items-center">
                    <SlPeople className="mr-2" /> Customers
                  </span>
                  <MdKeyboardArrowDown
                    className={`transition-transform ${
                      isCustomersOpen ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                {isCustomersOpen && (
                  <ul className="ml-4 space-y-2">
                    <li>
                      <NavLink
                        to="/home/addcustomer"
                        className="block hover:bg-gray-600 p-2 rounded"
                      >
                        <span className="flex items-center">
                          <FaPlus className="mr-2" /> Add Customer
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/home/managecustomer"
                        className="block hover:bg-gray-600 p-2 rounded"
                      >
                        <span className="flex items-center">
                          <CiSettings className="mr-2" /> Manage Customers
                        </span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
              {/* <li>
                <button
                  onClick={() => setUsersOpen(!isUsersOpen)}
                  className="flex items-center justify-between w-full text-left hover:bg-gray-700 p-2 rounded"
                >
                  <span className="flex items-center">
                    <FaRegUser className="mr-2" /> System Users
                  </span>
                  <MdKeyboardArrowDown
                    className={`transition-transform ${
                      isUsersOpen ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                {isUsersOpen && (
                  <ul className="ml-4 space-y-1">
                    <li>
                      <NavLink
                        to="adduser"
                        className="block hover:bg-gray-600 p-2 rounded"
                      >
                        <span className="flex items-center">
                          <FaPlus className="mr-2" /> Add User
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="manageuser"
                        className="block hover:bg-gray-600 p-2 rounded"
                      >
                        <span className="flex items-center">
                          <CiSettings className="mr-2" /> Manage Users
                        </span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li> */}
              <li>
                <button
                  onClick={() => setTemplateOpen(!isTemplateOpen)}
                  className="flex items-center justify-between w-full text-left hover:bg-gray-700 p-2 rounded"
                >
                  <span className="flex items-center">
                    <ImInsertTemplate className="mr-2" /> Templates
                  </span>
                  <MdKeyboardArrowDown
                    className={`transition-transform ${
                      isTemplateOpen ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                {isTemplateOpen && (
                  <ul className="ml-4 space-y-1">
                    <li>
                      <NavLink
                        to="/home/createtemplate"
                        className="block hover:bg-gray-600 p-2 rounded"
                      >
                        <span className="flex items-center">
                          <FaPlus className="mr-2" /> Add Template
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/home/managetemplate"
                        className="block hover:bg-gray-600 p-2 rounded"
                      >
                        <span className="flex items-center">
                          <CiSettings className="mr-2" /> Manage Template
                        </span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </nav>
        )}
      </div>
    </>
  );
}
