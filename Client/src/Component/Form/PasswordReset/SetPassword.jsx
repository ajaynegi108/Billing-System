import React, { useState } from "react";
import "./assets/css/PasswordReset.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom"; // Import useNavigate
import { useParams } from "react-router-dom";
import axios from "axios";
import api from "../../utils/api";
import { ToastContainer, toast } from "react-toastify"; // Import toastify
import "react-toastify/dist/ReactToastify.css"; // Import the Toast CSS

export default function SetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { id, type } = useParams();
  const navigate = useNavigate(); // Initialize the navigate hook

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    } else {
      setError(""); // Clear error message
    }

    try {
      // Sending the reset password request
      const response = await api.post(
        // "http://localhost:5000/api/auth/reset",
        "/auth/reset",
        { newPassword: password, token: id, type }
      );

      console.log(response);

      toast.success("Password has been successfully reset!");

      setTimeout(() => {
        if (type === "admin") {
          navigate("/login/admin");
        } else {
          navigate("/login/customer");
        }
      }, 1000);
    } catch (error) {
      console.error(error);
      // Show error toast if something goes wrong
      toast.error("Something went wrong. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <div>
      <div className="login-container">
        <div id="login-header">
          <h2>Set Password</h2>
        </div>
        <form onSubmit={handlePasswordReset}>
          <div className="form-group">
            <div className="input-div">
              <label className="m-2">New Password</label>
              <input
                type={passwordVisible ? "text" : "password"}
                className={`input-field ${error && "input-error"}`}
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="password-toggle mt-3"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="form-group">
            <div className="input-div">
              <label className="m-2">Confirm Password</label>
              <input
                type="password"
                className={`input-field ${error && "input-error"}`}
                placeholder=""
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && <p className="error-text">{error}</p>}

          <button
            type="submit"
            className="submit-button bg-blue-500 hover:bg-blue-600"
          >
            Reset Password
          </button>
        </form>

        <div className="links">
          <NavLink to={`/login/${type}`} className="form-link">
            Back to Login
          </NavLink>
          {type === "admin" && (
            <>
              <NavLink to="/register" className="form-link">
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>

      {/* ToastContainer to display toast notifications */}
      <ToastContainer />
    </div>
  );
}
