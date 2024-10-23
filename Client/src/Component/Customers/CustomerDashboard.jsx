import React from "react";
import { FaUser, FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa";

// Card component with darker background and white text
const CustomerCard = ({ customerName, dueDate, paidBills, bgColorClass }) => {
  return (
    <div
      className={`max-w-md ${bgColorClass} text-white shadow-lg rounded-lg p-6 m-4`}
    >
      <div className="flex items-center mb-4">
        <FaUser className="h-6 w-6 text-white mr-2" />
        <h2 className="text-xl font-bold">{customerName}</h2>
      </div>

      <div className="flex items-center mb-4">
        <FaCalendarAlt className="h-6 w-6 text-white mr-2" />
        <p className="text-white">Due Date: {dueDate}</p>
      </div>

      <div className="flex items-center">
        <FaMoneyBillWave className="h-6 w-6 text-white mr-2" />
        <p className="text-white">Paid Bills: {paidBills}</p>
      </div>
    </div>
  );
};

export default function CustomerDashboard() {
  // Data for multiple cards with darker background color classes
  const customers = [
    {
      customerName: "John Doe",
      dueDate: "2024-11-01",
      paidBills: "$200",
      bgColorClass: "bg-red-500",
    },
    {
      customerName: "Jane Smith",
      dueDate: "2024-10-15",
      paidBills: "$150",
      bgColorClass: "bg-blue-500",
    },
    {
      customerName: "Alice Johnson",
      dueDate: "2024-12-01",
      paidBills: "$300",
      bgColorClass: "bg-green-500",
    },
    {
      customerName: "Bob Brown",
      dueDate: "2024-10-25",
      paidBills: "$180",
      bgColorClass: "bg-yellow-500",
    },
    {
      customerName: "Emily Davis",
      dueDate: "2024-11-05",
      paidBills: "$220",
      bgColorClass: "bg-purple-500",
    },
    {
      customerName: "Michael Clark",
      dueDate: "2024-10-30",
      paidBills: "$400",
      bgColorClass: "bg-pink-500",
    },
  ];

  return (
    <div className="p-4">
      <div className="flex flex-wrap">
        {customers.map((customer, index) => (
          <CustomerCard
            key={index}
            customerName={customer.customerName}
            dueDate={customer.dueDate}
            paidBills={customer.paidBills}
            bgColorClass={customer.bgColorClass}
          />
        ))}
      </div>
    </div>
  );
}
