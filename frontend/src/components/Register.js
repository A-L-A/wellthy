import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let errors = {};

    if (!formData.fname.trim()) {
      errors.fname = "First name is required";
    } else if (!/^[A-Za-z]+$/.test(formData.fname)) {
      errors.fname = "First name must contain only letters";
    }

    if (!formData.lname.trim()) {
      errors.lname = "Last name is required";
    } else if (!/^[A-Za-z]+$/.test(formData.lname)) {
      errors.lname = "Last name must contain only letters";
    }

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    return errors;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch("http://localhost:3001/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (response.ok) {
          alert("Registration successful!");
          navigate("/login");
        } else {
          alert("Registration failed: " + data.message);
        }
      } catch (error) {
        alert("An error occurred: " + error);
      }
    } else {
      setFormErrors(errors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="container h-100 mt-5 mt-4 bg-light">
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <h3 className="text-center mb-4">Register</h3>

            <div className="mb-4">
              <label>First name</label>
              <input
                type="text"
                className={`form-control ${
                  formErrors.fname ? "is-invalid" : ""
                }`}
                placeholder="First name"
                name="fname"
                onChange={handleChange}
              />
              {formErrors.fname && (
                <div className="invalid-feedback">{formErrors.fname}</div>
              )}
            </div>

            <div className="mb-4">
              <label>Last name</label>
              <input
                type="text"
                className={`form-control ${
                  formErrors.lname ? "is-invalid" : ""
                }`}
                placeholder="Last name"
                name="lname"
                onChange={handleChange}
              />
              {formErrors.lname && (
                <div className="invalid-feedback">{formErrors.lname}</div>
              )}
            </div>

            <div className="mb-4">
              <label>Email address</label>
              <input
                type="email"
                className={`form-control ${
                  formErrors.email ? "is-invalid" : ""
                }`}
                placeholder="Enter email"
                name="email"
                onChange={handleChange}
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
                onChange={handleChange}
              />
              {formErrors.password && (
                <div className="invalid-feedback">{formErrors.password}</div>
              )}
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-secondary">
                Register
              </button>
            </div>

            <p className="forgot-password text-right mt-4">
              Already registered? <a href="/login">Log In</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
