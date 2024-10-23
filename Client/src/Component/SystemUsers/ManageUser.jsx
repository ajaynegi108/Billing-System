import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";

export default function ManageUser() {
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data for products (renamed for context)
  const products = [
    {
      id: 1,
      name: "John Doe",
      username: "johndoe",
      email: "john@example.com",
      phone: "123-456-7890",
    },
    {
      id: 2,
      name: "Jane Smith",
      username: "janesmith",
      email: "jane@example.com",
      phone: "234-567-8901",
    },
    {
      id: 3,
      name: "Mike Johnson",
      username: "mikej",
      email: "mike@example.com",
      phone: "345-678-9012",
    },
    // Add more sample products as needed
  ];

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <h1 className="text-4xl font-bold m-12">User List</h1>

      <div className="max-w-4xl mx-auto p-4 bg-[#E7E7E7]">
        <h3 className="text-lg font-semibold mb-2">Users</h3>
        <div className="mb-4 flex justify-between items-center">
          <span>Show {filteredProducts.length} Entries</span>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 bg-white shadow-md">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-4 text-left">Name</th>
              <th className="border border-gray-300 p-4 text-left">Username</th>
              <th className="border border-gray-300 p-4 text-left">Email</th>
              <th className="border border-gray-300 p-4 text-left">Phone</th>
              <th className="border border-gray-300 p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td className="border border-gray-300 p-4">{product.name}</td>
                <td className="border border-gray-300 p-4">
                  {product.username}
                </td>
                <td className="border border-gray-300 p-4">{product.email}</td>
                <td className="border border-gray-300 p-4">{product.phone}</td>
                <td className="border border-gray-300 p-4">
                  <button className="text-blue-500 hover:underline">
                    <FaRegEdit />
                  </button>
                  <button className="text-red-500 hover:underline ml-2">
                    <RiDeleteBinLine />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
