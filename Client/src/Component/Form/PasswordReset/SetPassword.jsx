import React, { useState } from "react";
import "./assets/css/PasswordReset.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
export default function SetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handlePasswordReset = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      setError("");
      // Handle password reset logic here
      console.log("Password reset for:", email);
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
              <input
                type={passwordVisible ? "text" : "password"}
                className={`input-field ${error && "input-error"}`}
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label className="floating-label">New Password</label>
              <span
                className="password-toggle"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="form-group">
            <div className="input-div">
              <input
                type="password"
                className={`input-field ${error && "input-error"}`}
                placeholder=""
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <label className="floating-label">Confirm Password</label>
            </div>
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="submit-button">
            Reset Password
          </button>
        </form>

        <div className="links">
          <a href="/login" className="form-link">
            Back to Login
          </a>
          <a href="/register" className="form-link">
            Register
          </a>
        </div>
      </div>
    </div>
  );
}
