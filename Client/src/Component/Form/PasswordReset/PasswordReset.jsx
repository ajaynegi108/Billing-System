import React, { useState } from "react";
import "./assets/css/PasswordReset.css";
import { NavLink } from "react-router-dom";
export default function PasswordReset() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handlePasswordReset = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required");
      return;
    }

    // Simulate sending password reset request to an email (this would be a backend API call)
    setError("");
    setMessage(`A password reset link has been sent to ${email}`);
    console.log("Password reset request sent for:", email);

    // Clear the email input after submission
    setEmail("");
  };

  return (
    <div className="login-container">
      <div id="login-header">
        <h2>Forgot password</h2>
      </div>
      <form onSubmit={handlePasswordReset}>
        <div className="form-group">
          <div className="input-div">
            <input
              type="email"
              className={`input-field ${error && "input-error"}`}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className="floating-label">Email</label>
          </div>
          {error && <p className="error-text">{error}</p>}
        </div>

        {message && <p className="success-text">{message}</p>}

        <button type="submit" className="submit-button">
          Request Password Reset
        </button>
      </form>

      <div className="links">
        <NavLink to="/login" className="form-link">
          Login
        </NavLink>
        <NavLink to="/login" className="form-link">
          Create account
        </NavLink>
      </div>
    </div>
  );
}
