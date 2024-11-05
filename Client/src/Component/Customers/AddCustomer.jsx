import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AddCustomer({
  type,
  userId,
  setIsOpen,
  getCustomerList,
}) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    abn: "",
    address1: "",
    address2: "",
    city: "",
    country: "",
    postcode: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint =
        type === "update" ? `customer/update/${userId}` : "customer/create";
      const response =
        type === "update"
          ? await api.put(endpoint, formData)
          : await api.post(endpoint, formData);

      toast.success(response.data.message);
      if (type === "update") {
        setIsOpen(false);
        getCustomerList();
      } else {
        setTimeout(() => {
          navigate("/home/managecustomer");
        }, 1500);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    if (type === "update") {
      const getCustomerById = async () => {
        try {
          const response = await api.get(`/customer/getcustomer/${userId}`);
          setFormData(response.data.customer);
        } catch (error) {
          console.log(error);
          toast.error("Failed to fetch customer details");
        }
      };
      getCustomerById();
    }
  }, [type, userId]);

  return (
    <>
      <ToastContainer />
      <h1 className="text-4xl font-bold m-12">
        {type === "update" ? "Edit Customer Details" : "Add Customer"}
      </h1>

      <div className="max-w-4xl mx-auto p-4 bg-[#E7E7E7]">
        <h3 className="text-lg font-semibold mb-2">Customer Information</h3>
      </div>
      <div className="max-w-4xl mx-auto p-4 bg-white shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex-1">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="name"
              >
                Enter Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter Name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex-1">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex-1">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="abn"
              >
                ABN
              </label>
              <input
                type="number"
                id="abn"
                name="abn"
                placeholder="Enter ABN"
                value={formData.abn}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex-1">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="address1"
              >
                Address 1
              </label>
              <input
                type="text"
                id="address1"
                name="address1"
                placeholder="Enter Address 1"
                value={formData.address1}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex-1">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="address2"
              >
                Address 2
              </label>
              <input
                type="text"
                id="address2"
                name="address2"
                placeholder="Enter Address 2"
                value={formData.address2}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="city"
              >
                Town/City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="Enter Town/City"
                value={formData.city}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex-1">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="country"
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                placeholder="Enter Country"
                value={formData.country}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex-1">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="postcode"
              >
                Postcode
              </label>
              <input
                type="text"
                id="postcode"
                name="postcode"
                placeholder="Enter Postcode"
                value={formData.postcode}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex-1">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="phone"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="w-48 bg-green-500 text-white font-semibold py-2 rounded hover:bg-green-600 transition duration-200 mt-7"
            >
              {type === "update" ? "Update Customer" : "Add Customer"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
