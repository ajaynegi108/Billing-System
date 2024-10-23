import React from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="logout-button"
      style={{
        padding: 10,
        backgroundColor: "#45a049",
        cursor: "pointer",
        border: "none",
        borderRadius: "5px",
      }}
    >
      Logout
    </button>
  );
}
