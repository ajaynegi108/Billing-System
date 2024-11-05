import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AddProduct({
  type = "create",
  productId,
  setIsOpen,
  getProductList,
}) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Product name is required.";
    if (!formData.description.trim())
      newErrors.description = "Product description is required.";
    if (!formData.price || parseFloat(formData.price) <= 0)
      newErrors.price = "Price must be a positive number.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      let response;
      if (type === "update" && productId) {
        response = await api.put(`product/update/${productId}`, formData);
        toast.success(response.data.message || "Product updated successfully");
        setIsOpen(false);
        getProductList();
      } else {
        response = await api.post(`product/create`, formData);
        toast.success(response.data.message || "Product created successfully");
        setTimeout(() => {
          navigate("/home/manageproduct");
        }, 1000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error saving product");
    }
  };

  useEffect(() => {
    const getProductById = async () => {
      if (type === "update" && productId) {
        try {
          const response = await api.get(`/product/getproduct/${productId}`);
          setFormData(response.data.product);
        } catch (error) {
          console.error(error);
        }
      }
    };
    getProductById();
  }, [productId, type]);

  return (
    <>
      <ToastContainer />
      <h1 className="text-4xl font-bold m-12">
        {type === "update" ? "Edit Product Details" : "Add Product"}
      </h1>
      <div className="max-w-4xl mx-auto p-4 bg-[#E7E7E7]">
        <h3 className="text-lg font-semibold mb-2">Product Information</h3>
      </div>
      <div className="max-w-4xl mx-auto p-4 bg-white shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex-1">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="name"
              >
                Product Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter Product Name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>
            <div className="flex-1">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="description"
              >
                Product Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                placeholder="Product Description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description}
                </p>
              )}
            </div>
            <div className="flex-1">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="price"
              >
                Product Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                placeholder="Enter Price"
                value={formData.price}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.price && (
                <p className="text-red-500 text-xs mt-1">{errors.price}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="w-48 bg-green-500 text-white font-semibold py-2 rounded hover:bg-green-600 transition duration-200 mt-7"
            >
              {type === "update" ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
