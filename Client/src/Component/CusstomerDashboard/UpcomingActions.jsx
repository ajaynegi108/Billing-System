// src/components/UpcomingActions.js
import React from "react";

export default function UpcomingActions() {
  return (
    <div className="bg-teal-500 shadow-lg rounded-lg p-6 text-white">
      <h3 className="text-lg font-semibold ">Upcoming Actions</h3>
      <ul className="mt-4 space-y-2">
        <li>Next Payment Due: 12/01/2024</li>
        <li>Subscription Renewal: 01/25/2025</li>
      </ul>
    </div>
  );
}
