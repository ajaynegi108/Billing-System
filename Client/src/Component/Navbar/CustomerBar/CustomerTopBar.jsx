import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import logo from "../asset/images/TOS_LOGO-white-bg-black.png";
export default function CustomerTopbar() {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userName"); // Clear user name on logout
    navigate("/login/customer");
  };

  // Toggle the dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Update the class on the root element whenever darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <nav className="flex items-center justify-between bg-gray-800 text-white h-12 px-4">
      <div className="text-lg font-semibold">
        <img src={logo} className="w-10 h-5" />
      </div>
      <div className="flex items-center">
        {/* <span className="mr-4">User Name</span> */}
        {/* Display user name here */}

        <button onClick={toggleDarkMode} className="p-2">
          {darkMode ? <CiLight /> : <MdDarkMode />}
        </button>

        <button
          onClick={handleLogout}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
