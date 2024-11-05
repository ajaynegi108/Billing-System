// src/components/Support.js
import React from "react";

export default function Support() {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800">Customer Support</h3>
      <div className="mt-4 space-y-4">
        <button className="w-full bg-blue-600 text-white py-2 rounded-md shadow-md hover:bg-blue-700">
          Live Chat
        </button>
        <button className="w-full bg-gray-600 text-white py-2 rounded-md shadow-md hover:bg-gray-700">
          Help Center
        </button>
      </div>
    </div>
  );
}
