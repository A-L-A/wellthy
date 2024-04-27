import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let errors = {};
    if (!credentials.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      errors.email = "Email is invalid";
    }
    if (!credentials.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const handleInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch("http://localhost:3001/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          localStorage.setItem("token", data.token); // Save token
          setIsLoggedIn(true);
          alert("Login successful!");
          navigate("/profile"); // Redirect to profile page

          // Decode the JWT to get the user data
          const decodedToken = parseJwt(data.token);
          if (decodedToken && decodedToken.user) {
            console.log("User Role:", decodedToken.user.role);
            // Store user data in localStorage
            localStorage.setItem("user", JSON.stringify(decodedToken.user));
          } else {
            console.error("User data not found in the token");
          }
        } else {
          alert("Login failed: " + data.message);
        }
      } catch (error) {
        alert("An error occurred: " + error);
      }
    } else {
      setFormErrors(errors);
    }
  };

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

  return (
    <div className="container h-100 mt-5 mt-4 bg-light">
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <h3 className="text-center mb-4">Log In</h3>

            <div className="mb-4">
              <label>Email address</label>
              <input
                type="email"
                className={`form-control ${
                  formErrors.email ? "is-invalid" : ""
                }`}
                placeholder="Enter email"
                name="email"
                value={credentials.email}
                onChange={handleInputChange}
              />
              {formErrors.email && (
                <div className="invalid-feedback">{formErrors.email}</div>
              )}
            </div>

            <div className="mb-4">
              <label>Password</label>
              <input
                type="password"
                className={`form-control ${
                  formErrors.password ? "is-invalid" : ""
                }`}
                placeholder="Enter password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
              />
              {formErrors.password && (
                <div className="invalid-feedback">{formErrors.password}</div>
              )}
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-secondary">
                Submit
              </button>
            </div>

            <p className="forgot-password text-right mt-4">
              <a href="/forgot-password">Forgot password?</a>
            </p>

            <p className="text-center mt-3">
              Don't have an account? <a href="/register">Create Account</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
