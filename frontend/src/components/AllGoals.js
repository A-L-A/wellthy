import React, { useState, useEffect } from "react";
import axios from "axios";

const AllGoals = ({ category}) => {
  const [goals, setGoals] = useState([]);
  const [editingGoalId, setEditingGoalId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    category: category,
    description: "",
    target: "",
    startDate: "",
    endDate: "",
    status: "notStarted",
  });
  const [formErrors, setFormErrors] = useState({
    description: "",
    target: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
      const fetchGoals = async () => {
        try {
          const token = localStorage.getItem("token");
          const goalsData = await axios.get(
            `http://localhost:3001/goals?category=${category}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setGoals(goalsData.data);
        } catch (error) {
          console.error("Error fetching goals:", error);
        }
      };
      fetchGoals();
    
  }, [category]);

  const handleEdit = (goal) => {
    setEditingGoalId(goal._id);
    setEditFormData({
      category: goal.category,
      description: goal.description,
      target: goal.target,
      startDate: goal.startDate,
      endDate: goal.endDate,
      status: goal.status,
    });
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!editFormData.description.trim()) {
      errors.description = "Description is required";
      isValid = false;
    }

    if (!editFormData.target.trim()) {
      errors.target = "Target is required";
      isValid = false;
    }

    if (!editFormData.startDate) {
      errors.startDate = "Start date is required";
      isValid = false;
    }
    setFormErrors(errors);
    return isValid;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3001/goals/${editingGoalId}`,
        editFormData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update the goals data by re-fetching it from the server
      const updatedGoalsData = await axios.get(
        `http://localhost:3001/goals?category=${category}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Set the goals state with the updated data
      setGoals(updatedGoalsData.data);
      setEditingGoalId(null);
      setFormErrors({});
    } catch (error) {
      console.error("Error updating goal:", error);
    }
  };


  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const deleteGoal = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3001/goals/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedGoals = goals.filter((goal) => goal._id !== id);
      setGoals(updatedGoals);
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) {
      return "N/A";
    }
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Invalid Date";
      }
      return date.toISOString().split("T")[0];
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Error";
    }
  };

  return (
    <div className="row mb-4">
      {goals.map((goal) => (
        <div className="col-md-4" key={goal._id}>
          <div className="card mb-3">
            <div className="card-body">
              {editingGoalId === goal._id ? (
                <form onSubmit={handleUpdate}>
                  <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={editFormData.category}
                    readOnly
                    className="form-control mb-2"
                  />
                  <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={editFormData.description}
                    onChange={handleEditInputChange}
                    className={`form-control mb-2 ${
                      formErrors.description ? "is-invalid" : ""
                    }`}
                  />
                  {formErrors.description && (
                    <div className="invalid-feedback">
                      {formErrors.description}
                    </div>
                  )}
                  <input
                    type="text"
                    name="target"
                    placeholder="Target"
                    value={editFormData.target}
                    onChange={handleEditInputChange}
                    className={`form-control mb-2 ${
                      formErrors.target ? "is-invalid" : ""
                    }`}
                  />
                  {formErrors.target && (
                    <div className="invalid-feedback">{formErrors.target}</div>
                  )}
                  <input
                    type="date"
                    name="startDate"
                    placeholder="Start Date"
                    value={editFormData.startDate}
                    onChange={handleEditInputChange}
                    className={`form-control mb-2 ${
                      formErrors.startDate ? "is-invalid" : ""
                    }`}
                  />
                  {formErrors.startDate && (
                    <div className="invalid-feedback">
                      {formErrors.startDate}
                    </div>
                  )}
                  <input
                    type="date"
                    name="endDate"
                    placeholder="End Date"
                    value={editFormData.endDate}
                    onChange={handleEditInputChange}
                    className={`form-control mb-2 ${
                      formErrors.endDate ? "is-invalid" : ""
                    }`}
                  />
                  {formErrors.endDate && (
                    <div className="invalid-feedback">{formErrors.endDate}</div>
                  )}

                  <select
                    name="status"
                    value={editFormData.status}
                    onChange={handleEditInputChange}
                    className="form-control mb-2">
                    <option value="">Select</option>
                    <option value="notStarted">Not Started</option>
                    <option value="inProgress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  <button type="submit" className="btn btn-primary mr-2">
                    Update
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setEditingGoalId(null)}>
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  <h5 className="card-title">{goal.description}</h5>
                  <p className="card-text">
                    <strong>Category:</strong> {goal.category}
                    <br />
                    <strong>Description:</strong> {goal.description}
                    <br />
                    <strong>Target:</strong> {goal.target}
                    <br />
                    <strong>Start Date:</strong> {formatDate(goal.startDate)}
                    <br />
                    <strong>End Date:</strong> {formatDate(goal.endDate)}
                    <br />
                    <strong>Status:</strong> {goal.status}
                  </p>
                  <button
                    className="btn btn-primary mr-2"
                    onClick={() => handleEdit(goal)}>
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteGoal(goal._id)}>
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllGoals;
