import React, { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import api from "../utils/api";
import { debounce } from "lodash"; // Import lodash debounce
import CreateInvoice from "./CreateInvoice";
import { FaRegEye } from "react-icons/fa";
import InvoiceTemplate from "./InvoiceTemplate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function ManageCustomer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [invoices, setInvoices] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false); // To track loading state
  const [noResults, setNoResults] = useState(false); // To track "no results" state
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [openPreview, setOpenPreview] = useState(false);
  const [currentId, setCurrentId] = useState("");

  // Debounced function for handling search input
  const debouncedSearch = debounce((value) => {
    setSearchTerm(value);
    searchInvoiceList(value);
  }, 300); // 500ms delay for debouncing

  const getInvoiceList = async () => {
    setLoading(true); // Set loading to true when starting the fetch
    try {
      const response = await api.get(
        `invoice/getall?page=${page}&limit=${limit}`
      );
      setInvoices(response.data.invoices);
      setTotalPages(response.data.totalPages); // Set total pages from the response
      setNoResults(response.data.invoices.length === 0); // Check if no results were found
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // Set loading to false when the fetch completes
    }
  };
  useEffect(() => {
    getInvoiceList();
  }, [page, limit]);

  const searchInvoiceList = async (val) => {
    setLoading(true); // Set loading to true when starting the fetch
    try {
      const response = await api.get(
        `invoice/getall?page=${page}&limit=${limit}&search=${val}`
      );

      setInvoices(response.data.invoices);
      setTotalPages(response.data.totalPages); // Set total pages from the response
      setNoResults(response.data.invoices.length === 0); // Check if no results were found
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

  const deleteInvoiceById = async (id) => {
    try {
      const response = await api.delete(`/invoice/delete/${id}`);
      getInvoiceList();
      toast.success(response.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ToastContainer />
      <h1 className="text-4xl font-bold m-12">Invoice List</h1>

      <div className="max-w-6xl mx-auto p-4 bg-[#E7E7E7]">
        <h3 className="text-lg font-semibold mb-2">Invoice Information</h3>
        <div className="mb-4 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search..."
            onChange={handleSearchChange} // Trigger the debounced search on input change
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500 w-[100%]"
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 bg-white shadow-md">
        {/* Show loading spinner or message */}
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : noResults ? (
          <div className="text-center py-8">No invoices found</div>
        ) : (
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-4 text-left">
                  Invoice ID
                </th>
                <th className="border border-gray-300 p-4 text-left">Name</th>
                <th className="border border-gray-300 p-4 text-left">Email</th>
                <th className="border border-gray-300 p-4 text-left">Amount</th>
                <th className="border border-gray-300 p-4 text-left">Phone</th>
                <th className="border border-gray-300 p-4 text-left">Status</th>
                <th className="border border-gray-300 p-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {invoices?.map((invoice) => (
                <tr key={invoice._id}>
                  <td className="border border-gray-300 p-4">
                    {invoice._id}
                    {/* TOS{invoice._id.slice(-4)} */}
                  </td>
                  <td className="border border-gray-300 p-4">{invoice.name}</td>
                  <td className="border border-gray-300 p-4">
                    {invoice.email}
                  </td>
                  <td className="border border-gray-300 p-4">
                    ${invoice.totalAmount}
                  </td>
                  <td className="border border-gray-300 p-4">
                    {invoice?.phone}
                  </td>
                  <td className="border border-gray-300 p-4">
                    {invoice?.invoiceStatus}
                  </td>
                  <td className="border border-gray-300 p-4">
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => {
                        setIsOpen(true);
                        setUserId(invoice._id);
                      }}
                    >
                      <FaRegEdit />
                    </button>
                    <button
                      className="text-red-500 hover:underline ml-2"
                      onClick={() => {
                        deleteInvoiceById(invoice._id);
                      }}
                    >
                      <RiDeleteBinLine />
                    </button>
                    <button
                      className="text-red-500 hover:underline ml-2"
                      onClick={() => {
                        setOpenPreview(true);
                        setCurrentId(invoice._id);
                      }}
                    >
                      <FaRegEye />
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
      {openPreview && (
        <>
          <div
            id="modal"
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          >
            <div className="bg-white p-6 rounded-lg shadow-lg w-[80%] max-h-[90vh] overflow-y-auto relative z-60">
              <button
                className="absolute top-0 right-0 m-2 text-gray-500 hover:text-gray-700"
                onClick={() => {
                  setOpenPreview(false);
                }}
              >
                Close
              </button>

              <p className="mb-4 mt-4">
                <InvoiceTemplate
                  currentId={currentId}
                  className="w-full"
                  setOpenPreview={setOpenPreview}
                />
              </p>
            </div>
          </div>
        </>
      )}
      {isOpen && (
        <>
          <div
            id="modal"
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          >
            <div className="bg-white p-6 rounded-lg shadow-lg w-[95%] max-h-[90vh] overflow-y-auto relative z-60">
              <button
                className="absolute top-0 right-0 m-2 text-gray-500 hover:text-gray-700"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Close
              </button>

              <p className="mb-4 mt-4">
                <CreateInvoice
                  type="update"
                  userId={userId}
                  setIsOpen={setIsOpen}
                  getInvoiceList={getInvoiceList}
                />
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
