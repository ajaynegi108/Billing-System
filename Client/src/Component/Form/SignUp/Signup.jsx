import React, { useState } from "react";
import axios from "axios";
import api from "../../utils/api";
import { useNavigate, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for the toast notifications

const SignupForm = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    phone: "",
    fullname: "",
    password: "",
    role: 1000,
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: "" }); // Clear error message for the field
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.companyName)
      newErrors.companyName = "Company name is required";
    if (!formData.fullname) newErrors.fullname = "Full Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(validate());

    if (Object.keys(errors).length > 0) return; // Don't proceed if there are validation errors

    setLoading(true);
    setSuccessMessage("");

    try {
      console.log(formData);
      const response = await api.post(
        // "http://localhost:5000/api/auth/register",
        "/auth/register",
        formData
      );

      // Display a success toast notification
      toast.success(
        "Signup successful! Please check your email for confirmation."
      );

      setFormData({
        fullname: "",
        companyName: "",
        email: "",
        phone: "",
        password: "",
        role: 1000,
      }); // Reset form
    } catch (error) {
      console.error("Error signing up:", error);
      setErrors({ form: "Signup failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Register a User</h2>
      {successMessage && (
        <div className="mb-4 text-green-600">{successMessage}</div>
      )}
      {errors.form && <div className="mb-4 text-red-600">{errors.form}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Full Name"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            className={`mt-1 p-2 block w-full border rounded-md ${
              errors.fullname ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.fullname && (
            <p className="text-red-600 text-sm">{errors.fullname}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Company Name
          </label>
          <input
            type="text"
            placeholder="Company Name"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className={`mt-1 p-2 block w-full border rounded-md ${
              errors.companyName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.companyName && (
            <p className="text-red-600 text-sm">{errors.companyName}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`mt-1 p-2 block w-full border rounded-md ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`mt-1 p-2 block w-full border rounded-md ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.phone && (
            <p className="text-red-600 text-sm">{errors.phone}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`mt-1 p-2 block w-full border rounded-md  ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            <span
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer z-10 text-lg text-gray-500"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {errors.password && (
            <p className="text-red-600 text-sm">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-md text-white ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          } transition duration-200`}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
      <p className="mt-4 text-sm text-center text-gray-600">
        Already have an account?{" "}
        <NavLink to="/login" className="text-blue-500 hover:underline">
          Log in
        </NavLink>
      </p>

      {/* ToastContainer for toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default SignupForm;
