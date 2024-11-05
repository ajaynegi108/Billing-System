import React from "react";

export default function PaymentHistory() {
  const payments = [
    { date: "2024-10-01", amount: 200, status: "Completed" },
    { date: "2024-09-15", amount: 250, status: "Completed" },
  ];
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Payment History</h2>
      <table className="min-w-full mt-2 border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Date</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={index} className="border-b">
              <td className="border p-2">{payment.date}</td>
              <td className="border p-2">${payment.amount}</td>
              <td className="border p-2">{payment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
