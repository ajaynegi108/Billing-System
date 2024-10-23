import React, { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import api from "../utils/api";
import { debounce } from "lodash"; // Import lodash debounce
import AddCustomer from "./AddCustomer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function ManageCustomer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false); // To track loading state
  const [noResults, setNoResults] = useState(false); // To track "no results" state
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState("");
  // Debounced function for handling search input
  const debouncedSearch = debounce((value) => {
    setSearchTerm(value);
    searchCustomerList(value);
  }, 300); // 500ms delay for debouncing

  const getCustomerList = async () => {
    setLoading(true); // Set loading to true when starting the fetch
    try {
      const response = await api.get(
        `customer/getall?page=${page}&limit=${limit}`
      );
      setCustomers(response.data.customers);
      setTotalPages(response.data.totalPages); // Set total pages from the response
      setNoResults(response.data.customers.length === 0); // Check if no results were found
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // Set loading to false when the fetch completes
    }
  };
  useEffect(() => {
    getCustomerList();
  }, [page, limit]);

  const searchCustomerList = async (val) => {
    setLoading(true); // Set loading to true when starting the fetch
    try {
      const response = await api.get(
        `customer/getall?page=${page}&limit=${limit}&search=${val}`
      );

      setCustomers(response.data.customers);
      setTotalPages(response.data.totalPages); // Set total pages from the response
      setNoResults(response.data.customers.length === 0); // Check if no results were found
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // Set loading to false when the fetch completes
    }
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  // Handle input change for search with debouncing
  const handleSearchChange = (e) => {
    const value = e.target.value;
    debouncedSearch(value); // Call the debounced function
  };

  const deleteCustomerById = async (id) => {
    try {
      const response = await api.delete(`/customer/delete/${id}`);
      getCustomerList();
      toast.success(response.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ToastContainer />
      <h1 className="text-4xl font-bold m-12">Customer List</h1>

      <div className="max-w-4xl mx-auto p-4 bg-[#E7E7E7]">
        <h3 className="text-lg font-semibold mb-2">Customer Information</h3>
        <div className="mb-4 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search..."
            onChange={handleSearchChange} // Trigger the debounced search on input change
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 bg-white shadow-md">
        {/* Show loading spinner or message */}
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : noResults ? (
          <div className="text-center py-8">No customers found</div>
        ) : (
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-4 text-left">Name</th>
                <th className="border border-gray-300 p-4 text-left">Email</th>
                <th className="border border-gray-300 p-4 text-left">ABN</th>
                <th className="border border-gray-300 p-4 text-left">
                  Address
                </th>
                <th className="border border-gray-300 p-4 text-left">Phone</th>
                <th className="border border-gray-300 p-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {customers?.map((customer) => (
                <tr key={customer._id}>
                  <td className="border border-gray-300 p-4">
                    {customer.name}
                  </td>
                  <td className="border border-gray-300 p-4">
                    {customer.email}
                  </td>
                  <td className="border border-gray-300 p-4">{customer.abn}</td>
                  <td className="border border-gray-300 p-4">
                    {customer.address1} {customer.address2}
                  </td>
                  <td className="border border-gray-300 p-4">
                    {customer.phone}
                  </td>
                  <td className="border border-gray-300 p-4">
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => {
                        setIsOpen(true);
                        setUserId(customer._id);
                      }}
                    >
                      <FaRegEdit />
                    </button>
                    <button
                      className="text-red-500 hover:underline ml-2"
                      onClick={() => {
                        deleteCustomerById(customer._id);
                      }}
                    >
                      <RiDeleteBinLine />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4">
        <button
          className={`px-4 py-2 mx-2 bg-gray-300 rounded ${
            page === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          className={`px-4 py-2 mx-2 bg-gray-300 rounded ${
            page === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>

      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 w-[100%]">
            <div className="bg-white rounded-lg shadow-lg p-6  w-[60%]">
              <p className="text-gray-700 mb-6 w-full">
                <AddCustomer
                  type="update"
                  userId={userId}
                  setIsOpen={setIsOpen}
                  getCustomerList={getCustomerList}
                />
              </p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
