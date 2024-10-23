import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { debounce } from "lodash"; // Import lodash debounce
import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { FaSearch, FaEye } from "react-icons/fa";
import InvoiceEditor from "./InvoiceEditor";

export default function ManageTemplate() {
  const [templateList, setTemplateList] = useState([]);
  const [templateId, setTemplateId] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [loading, setLoading] = useState(false); // To track loading state
  const [limit, setLimit] = useState(9);
  const [isOpenPre, setIsOpenPre] = useState(false);
  const [currentThumbnail, setCurrentThumbnail] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const getTemplateList = async () => {
    try {
      setLoading(true);
      const response = await api.get(
        `template/getall?page=${page}&limit=${limit}`
      );
      setTemplateList(response.data.templates);

      setTotalPages(response.data.totalPages); // Set total pages from the response
      setNoResults(response.data.templates.length === 0);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTemplateList();
  }, [page]);

  const deleteTemplateById = async (id) => {
    try {
      const response = await api.delete(`/template/delete/${id}`);
      toast.success(response.data.message);
      getTemplateList();
    } catch (err) {
      console.log(err);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const debouncedSearch = debounce((value) => {
    setSearchTerm(value);
    searchTemplateList(value);
  }, 300); // 500ms delay for debouncing
  // Handle input change for search with debouncing
  const handleSearchChange = (e) => {
    const value = e.target.value;
    debouncedSearch(value); // Call the debounced function
  };
  const searchTemplateList = async (val) => {
    try {
      setLoading(true);
      const response = await api.get(
        `template/getall?page=${page}&limit=${limit}&search=${val}`
      );

      setTemplateList(response.data.templates);
      setTotalPages(response.data.totalPages); // Set total pages from the response
      setNoResults(response.data.templates.length === 0); // Check if no results were found
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <h1 className="text-4xl font-bold mb-4">Template List</h1>

      <div className="max-w-full mx-auto p-4 mb-5 bg-[#E7E7E7]">
        <h3 className="text-lg font-semibold mb-2">Templates</h3>
        <div className="mb-4 flex justify-between items-center w-full">
          <div className="relative w-[50%]">
            <input
              type="text"
              placeholder="Search..."
              onChange={handleSearchChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500 pl-10 w-[100%]" // Add padding-left to make space for the icon
            />
            <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
              <FaSearch />
            </span>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : noResults ? (
        <div className="text-center py-8">No Products found</div>
      ) : (
        <>
          {" "}
          <div className="flex flex-wrap gap-5 justify-start">
            {templateList.map((val) => (
              <div
                key={val._id}
                className="w-[30%] h-[400px] border-2 transition-transform transform hover:scale-105 hover:outline hover:outline-2 hover:outline-blue-400 hover:shadow-2lg "
              >
                <div className="overflow-hidden h-[250px]">
                  <img
                    src={val.thumbnail}
                    alt={`Thumbnail for template: ${val.name}`}
                  />
                </div>
                <div className="p-3">
                  {" "}
                  <p className="text-[16px]">
                    <b>{val.name}</b>
                  </p>
                  <p className="text-[12px]">{val.description}</p>
                  <button
                    className="text-red-500 hover:underline ml-2 mr-2 px-1 py-2 mt-5"
                    onClick={() => {
                      deleteTemplateById(val._id);
                    }}
                  >
                    <RiDeleteBinLine className="text-2xl" />
                  </button>
                  <button
                    className="text-blue-500 hover:underline px-1 py-2 mt-5"
                    onClick={() => {
                      setIsOpen(true);
                      setTemplateId(val._id);
                    }}
                  >
                    <FaRegEdit className="text-2xl" />
                  </button>
                  <button
                    className="text-blue-500 hover:underline px-1 py-2 mt-5"
                    onClick={() => {
                      setIsOpenPre(true);
                      setCurrentThumbnail(val.thumbnail);
                    }}
                  >
                    <FaEye className="text-2xl" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center my-6 py-4">
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
        </>
      )}

      {isOpenPre && (
        <>
          <div
            id="modal"
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          >
            <div className="bg-white p-6 rounded-lg shadow-lg w-[80%] max-h-[90vh] overflow-y-auto relative z-60 text-center">
              <button
                className="absolute top-0 right-0 m-2 text-gray-500 hover:text-gray-700"
                onClick={() => {
                  setIsOpenPre(false);
                  setCurrentThumbnail(null);
                }}
              >
                Close
              </button>

              <p className="mb-4 mt-10">
                <img
                  src={currentThumbnail}
                  alt={`Thumbnail for template`}
                  className="w-[100%]"
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
            <div className="bg-white p-6 rounded-lg shadow-lg w-[100%] max-h-[90vh] overflow-y-auto relative z-60">
              <button
                className="absolute top-0 right-0 m-2 text-gray-500 hover:text-gray-700"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Close
              </button>

              <p className="mb-4 mt-4">
                <InvoiceEditor
                  type="update"
                  templateId={templateId}
                  setIsOpen={setIsOpen}
                  getTemplateList={getTemplateList}
                />
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
