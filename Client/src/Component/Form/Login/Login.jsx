import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom"; // Import useNavigate for redirection
import axios from "axios"; // Import Axios for API requests
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import "./assets/css/login.css";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
        const response = await axios.post(
          "http://localhost:5000/api/auth/login",
          {
            email: formData.email,
            password: formData.password,
          }
        );

        // If login is successful
        if (response.status === 200) {
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("refreshToken", response.data.refreshToken);
          // localStorage.setItem("user_id", response.data.user_id);

          // Redirect to the home page
          navigate("/home/dashboard");
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
    <div className="login-container">
      <h2 id="login-header">Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group" id="email-group">
          <div className="input-div">
            <input
              id="email-input"
              className={`input-field ${errors.email ? "input-error" : ""}`}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <label
              htmlFor="email-input"
              className={`floating-label ${formData.email ? "focused" : ""}`}
            >
              Email
            </label>
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
        </div>
        <div className="form-group" id="password-group">
          <div className="input-div">
            <input
              id="password-input"
              className={`input-field ${errors.password ? "input-error" : ""}`}
              type={passwordVisible ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
            <label
              htmlFor="password-input"
              className={`floating-label ${formData.password ? "focused" : ""}`}
            >
              Password
            </label>
            <span
              className="password-toggle"
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
        <button type="submit" id="login-button" className="submit-button">
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
