import React, { useState } from "react";
import "./assets/css/PasswordReset.css";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the Toast CSS

export default function PasswordReset() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { type } = useParams();
  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      // API request for password reset
      const response = await axios.post(
        "http://localhost:5000/api/auth/forget",
        // "https://invoice-backend-ocfk.onrender.com/api/auth/forget",
        { email, type }
      );

      if (response.data.message) {
        // Success: Notify the user with a success toast
        toast.success(`A password reset link has been sent to ${email}`);
      }

      // Clear any existing error or message
      setError("");
      setMessage(`A password reset link has been sent to ${email}`);
      setEmail(""); // Clear the email input
    } catch (error) {
      // Error: Notify the user with an error toast
      setError("Invalid email address.");
      toast.error("Failed to send password reset email.");
    }
  };

  return (
    <div className="login-container">
      <div id="login-header">
        <h1>Forgot password</h1>
      </div>
      <form onSubmit={handlePasswordReset}>
        <div className="form-group">
          <div className="input-div">
            <label className="m-2">Email</label>
            <input
              type="email"
              className={`input-field ${error && "input-error"}`}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-text">{error}</p>}
        </div>

        {message && <p className="success-text">{message}</p>}

        <button
          type="submit"
          className="submit-button bg-blue-500 hover:bg-blue-600"
        >
          Request Password Reset
        </button>
      </form>

      <div className="links">
        <NavLink to="/login" className="form-link ml-2">
          Login
        </NavLink>
        <NavLink to="/signup" className="form-link mr-2">
          Create account
        </NavLink>
      </div>

      {/* Toast Container for toasts */}
      <ToastContainer />
    </div>
  );
}
