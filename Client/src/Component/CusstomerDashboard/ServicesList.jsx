import React, { useState } from "react";

// Sample data
const services = [
  {
    name: "SEO Optimization",
    status: "Active",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
  },
  {
    name: "Website Design",
    status: "Completed",
    startDate: "2024-02-15",
    endDate: "2024-05-15",
  },
];

export default function ServicesList() {
  const [activeTab, setActiveTab] = useState("overview"); // State for managing active tab

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 p-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">Service Overview</h3>
          <div className="space-y-4">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="text-lg font-bold">{service.name}</h4>
                <p>
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      service.status === "Active"
                        ? "text-green-500"
                        : "text-gray-500"
                    }`}
                  >
                    {service.status}
                  </span>
                </p>
                <p>Start Date: {service.startDate}</p>
                <p>End Date: {service.endDate}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
