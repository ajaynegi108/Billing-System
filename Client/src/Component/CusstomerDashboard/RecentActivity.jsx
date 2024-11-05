// src/components/RecentActivity.js
import React from "react";

export default function RecentActivity() {
  return (
    <div className="bg-gray-500 shadow-lg rounded-lg p-6 text-white">
      <h3 className="text-lg font-semibold ">Recent Activity</h3>
      <ul className="mt-4 space-y-4">
        <li className="flex justify-between items-center">
          <span className="">SEO Service Purchase</span>
          <span className="">$150</span>
        </li>
      </ul>
    </div>
  );
}
