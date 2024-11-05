// src/components/ProfileOverview.js
import React from "react";

export default function ProfileOverview() {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="flex items-center space-x-4">
        <img
          src="https://randomuser.me/api/portraits/men/42.jpg"
          alt="Profile"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">John Doe</h2>
          <p className="text-gray-600">Premium Member</p>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-gray-500">
          Total Spent: <span className="font-semibold">$2345.67</span>
        </p>
      </div>

      <div className="mt-4 flex space-x-4">
        <button className="w-full bg-blue-600 text-white py-2 rounded-md shadow-md hover:bg-blue-700">
          Update Profile
        </button>
        <button className="w-full bg-green-600 text-white py-2 rounded-md shadow-md hover:bg-green-700">
          Upgrade Plan
        </button>
      </div>
    </div>
  );
}
