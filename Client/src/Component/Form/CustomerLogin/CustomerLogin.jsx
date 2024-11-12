import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom"; // Import useNavigate for redirection
import axios from "axios"; // Import Axios for API requests
import api from "../../utils/api";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import "../Login/assets/css/login.css";

export default function CustomerLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    type: "customer",
  });
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [serverError, setServerError] = useState(""); // For handling server-side errors

  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email.";
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(""); // Clear any previous server errors
    if (validateForm()) {
      try {
        // Send login data to the server
        const response = await api.post(
          // "http://localhost:5000/api/auth/login",
          "/auth/login",
          {
            email: formData.email,
            password: formData.password,
            type: formData.type,
          }
        );

        // If login is successful
        if (response.status === 200) {
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("refreshToken", response.data.refreshToken);
          localStorage.setItem("fullname", response.data.fullname);
          // localStorage.setItem("user_id", response.data.user_id);

          // Redirect to the home page
          navigate("/customer/dashboard");
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // If authentication fails, set server error message
          setServerError("Invalid email or password.");
        } else {
          setServerError("An unexpected error occurred. Please try again.");
        }
      }
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="logincontainer">
      <h2 id="login-header">Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group" id="email-group">
          <div className="input-div">
            <label className="m-2">Email</label>
            <input
              id="email-input"
              className={`input-field ${errors.email ? "input-error" : ""}`}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />

            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
        </div>
        <div className="form-group" id="password-group">
          <div className="input-div">
            <label className="m-2">Password</label>
            <input
              id="password-input"
              className={`input-field ${errors.password ? "input-error" : ""}`}
              type={passwordVisible ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />

            <span
              className="password-toggle mt-3"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.password && (
              <span className="error-text">{errors.password}</span>
            )}
          </div>
        </div>
        {serverError && <p className="server-error">{serverError}</p>}{" "}
        {/* Display server error message */}
        <button
          type="submit"
          id="login-button"
          className="submit-button bg-blue-500 hover:bg-blue-600"
        >
          Login
        </button>
      </form>

      <div className="links">
        <NavLink to="/signup" id="forgot-password-link" className="form-link">
          Create account
        </NavLink>
        <NavLink
          to="/password-reset"
          id="forgot-password-link"
          className="form-link"
        >
          Forgot password?
        </NavLink>
      </div>
    </div>
  );
}
