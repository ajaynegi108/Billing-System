import React from "react";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-gray-800 text-white h-12 px-4">
      <div className="text-lg font-semibold">My App</div>
      <div className="flex items-center">
        <span className="mr-4">User Admin</span>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded">
          Logout
        </button>
      </div>
    </nav>
  );
}
