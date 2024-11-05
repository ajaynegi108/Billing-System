// src/components/Dashboard.js
import React from "react";
import ProfileOverview from "./ProfileOverview";
import KeyMetrics from "./KeyMetrics";
import RecentActivity from "./RecentActivity";
import UpcomingActions from "./UpcomingActions";
import Support from "./Support";

export default function HomeDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-8">
          {/* Profile Overview */}
          <div className="col-span-1">
            <ProfileOverview />
          </div>

          {/* Key Metrics */}
          <div className="col-span-1 grid grid-cols-1 gap-8">
            <KeyMetrics />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="col-span-1">
            <RecentActivity />
          </div>

          {/* Upcoming Actions */}
          <div className="col-span-1">
            <UpcomingActions />
          </div>
        </div>
      </div>
    </div>
  );
}
