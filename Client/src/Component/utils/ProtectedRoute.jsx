import React from "react";
import { Navigate } from "react-router-dom";

// Assuming isAuthenticated checks if the user is logged in
const isAuthenticated = () => {
  return !!localStorage.getItem("accessToken"); // Replace with your actual token logic
};

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
