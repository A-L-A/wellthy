import React, { useState } from "react";
import axios from "axios";

const GoalForm = ({ category }) => {
  const [formData, setFormData] = useState({
    category: category,
    target: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "", // Default value for status
  });

  const [formErrors, setFormErrors] = useState({
    category: "",
    target: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" }); // Clear errors on change
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.category) {
      errors.category = "Category is required";
      isValid = false;
    }

    if (!formData.target.trim()) {
      errors.target = "Target is required";
      isValid = false;
    }

    if (!formData.startDate) {
      errors.startDate = "Start date is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
          },
        };

        const response = await axios.post(
          "http://localhost:3001/goals",
          formData,
          config
        );
        console.log("Goal saved:", response.data);
        setSubmissionStatus("success");
        setFormData({
          category: "",
          target: "",
          description: "",
          startDate: "",
          endDate: "",
          status: "", // Reset status to default after successful submission
        });
      } catch (error) {
        console.error("Error saving goal:", error);
        setSubmissionStatus("error");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="pb-5 pt-1">
      <div className="form-group">
        <label htmlFor="category">Category:</label>
        <select
          className={`form-control ${formErrors.category ? "is-invalid" : ""}`}
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          required // Make category selection required
        >
          <option value="">Select</option> {/* Added default option */}
          <option value="fitness">Fitness</option>
          <option value="nutrition">Nutrition</option>
          <option value="mentalHealth">Mental Health</option>
        </select>
        <div className="invalid-feedback">{formErrors.category}</div>
      </div>

      <div className="form-group">
        <label htmlFor="target">Target:</label>
        <input
          type="text"
          className={`form-control ${formErrors.target ? "is-invalid" : ""}`}
          id="target"
          name="target"
          value={formData.target}
          onChange={handleInputChange}
          required
        />
        <div className="invalid-feedback">{formErrors.target}</div>
      </div>

      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          className="form-control"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          className={`form-control ${formErrors.startDate ? "is-invalid" : ""}`}
          id="startDate"
          name="startDate"
          value={formData.startDate}
          onChange={handleInputChange}
          required
        />
        <div className="invalid-feedback">{formErrors.startDate}</div>
      </div>

      <div className="form-group">
        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          className="form-control"
          id="endDate"
          name="endDate"
          value={formData.endDate}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="status">Status:</label>
        <select
          className="form-control"
          id="status"
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          required // Make status selection required
        >
          <option value="">Select</option> {/* Added default option */}
          <option value="notStarted">Not Started</option>
          <option value="inProgress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary mt-3">
        Create Goal
      </button>

      {/* Conditional rendering of success message */}
      {submissionStatus === "success" && (
        <div className="alert alert-success mt-3" role="alert">
          Goal created successfully!
        </div>
      )}

      {/* Conditional rendering of error message */}
      {submissionStatus === "error" && (
        <div className="alert alert-danger mt-3" role="alert">
          Error creating goal. Please try again.
        </div>
      )}
    </form>
  );
};

export default GoalForm;
