// src/components/KeyMetrics.js
import React from "react";

export default function KeyMetrics() {
  return (
    <div className="space-y-4">
      <div className="bg-blue-500 shadow-lg rounded-lg p-6 text-white">
        <h3 className="text-lg font-semibold ">Total Spent</h3>
        <p className="text-2xl ">$2345.67</p>
      </div>

      <div className="bg-green-500 shadow-lg rounded-lg p-6 text-white">
        <h3 className="text-lg font-semibold">Recent Services</h3>
        <ul>
          <li>SEO</li>
          <li>Website</li>
        </ul>
      </div>

      <div className="bg-yellow-500 shadow-lg rounded-lg p-6 text-white">
        <h3 className="text-lg font-semibold ">Subscription Services</h3>
        <p>Renewal Date: 01/25/2025</p>
      </div>
    </div>
  );
}
