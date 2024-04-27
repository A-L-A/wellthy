import React from "react";
import { useNavigate } from "react-router-dom";

function Profile({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    onLogout();
    navigate("/login");
  };

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  if (!user) {
    console.error("User data not found in localStorage");
    navigate("/login");
    return <div>User not found. Please log in.</div>;
  }

  console.log("Retrieved user data:", user); // Log to see what you get

  return (
    <div className="container mt-5">
      <h2>Profile</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Welcome, {user.email}</h5>
          <button onClick={handleLogout} className="btn btn-danger">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
