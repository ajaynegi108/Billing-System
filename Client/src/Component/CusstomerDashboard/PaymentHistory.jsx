import React from "react";

export default function PaymentHistory() {
  const payments = [
    { date: "2024-10-01", amount: 200, status: "Completed" },
    { date: "2024-09-15", amount: 250, status: "Completed" },
  ];

  const statusColors = {
    Completed: "bg-green-500 text-white",
    Pending: "bg-yellow-500 text-white",
    Failed: "bg-red-500 text-white",
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Payment History
      </h2>
      <table className="min-w-full table-auto bg-white rounded-lg overflow-hidden shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
              Date
            </th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
              Amount
            </th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr
              key={index}
              className={`border-b ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-gray-100 transition-all`}
            >
              <td className="py-3 px-4 text-sm text-gray-700">
                {payment.date}
              </td>
              <td className="py-3 px-4 text-sm text-gray-700">
                ${payment.amount}
              </td>
              <td
                className={`py-3 px-4 text-sm font-semibold text-center ${
                  statusColors[payment.status]
                }`}
              >
                {payment.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
