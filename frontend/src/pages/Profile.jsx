import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "../components/AdminDashboard";

const Profile = ({ onLogout }) => {
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          const decodedToken = parseJwt(token);

          if (decodedToken && decodedToken.user) {
            const { email, role } = decodedToken.user;
            setUserEmail(email);
            setUserRole(role);
          } else {
            console.error("User data not found in the token");
          }
        } else {
          console.error("User data not found in localStorage");
          navigate("/login"); // Redirect to the login page if token is not found
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login"); // Redirect to the login page if an error occurs
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  // Helper function to decode the JWT
  function parseJwt(token) {
    if (!token) return null;
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!userEmail) {
    return null;
  }

  return (
    <div>
      {userRole === "admin" ? (
        <AdminDashboard />
      ) : (
        <div>
          <h2>Welcome, {userEmail}!</h2>
          <p>This is your profile page. Your role is: {userRole}</p>
        </div>
      )}
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Profile;
