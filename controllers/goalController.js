const Goal = require("../models/goal");
const moment = require("moment");

// Function to get all goals (admin likely)
const getAllGoals = async (req, res) => {
  try {
    const goals = await Goal.find();
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: "Error getting goals", error });
  }
};

// Function to create a goal
const createGoal = async (req, res) => {
  try {
    const { category, description, target, startDate, endDate, status } =
      req.body;
    const createdBy = req.user._id;

    // Format dates as needed
    const formattedStartDate = moment(startDate, "YYYY-MM-DD").toDate();
    const formattedEndDate = endDate
      ? moment(endDate, "YYYY-MM-DD").toDate()
      : null;

    const newGoal = new Goal({
      userId: createdBy,
      category,
      description,
      target,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      status,
    });

    await newGoal.save();
    res.json({ message: "Goal created successfully." });
  } catch (error) {
    if (error.name === "ValidationError") {
      res
        .status(400)
        .json({ message: "Error creating goal", errors: error.errors });
    } else {
      res.status(500).json({ message: "Error creating goal", error });
    }
  }
};

// Function to update a goal
const updateGoal = async (req, res) => {
  const { id } = req.params;

  try {
    const { category, description, target, startDate, endDate, status } =
      req.body;

    // Format dates if provided
    const formattedStartDate = startDate
      ? moment(startDate, "YYYY-MM-DD").toDate()
      : null;
    const formattedEndDate = endDate
      ? moment(endDate, "YYYY-MM-DDY").toDate()
      : null;

    const updatedGoal = await Goal.findByIdAndUpdate(
      id,
      {
        category,
        description,
        target,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        status,
      },
      { new: true }
    );

    if (!updatedGoal) {
      return res.status(404).json({ message: "Goal not found." });
    }

    res.json({ message: "Goal updated successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error updating goal", error });
  }
};

// Function to delete a goal
const deleteGoal = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedGoal = await Goal.findByIdAndDelete(id);

    if (!deletedGoal) {
      return res.status(404).json({ message: "Goal not found." });
    }

    res.json({ message: "Goal deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting goal", error });
  }
};

// Function for staff to create a goal
const createGoalForStaff = async (req, res) => {
  try {
    const { category, description, target, startDate, endDate, status } =
      req.body;
    const createdBy = req.user._id;

    // Format dates as needed
    const formattedStartDate = moment(startDate, "YYYY-MM-DD").toDate();
    const formattedEndDate = endDate
      ? moment(endDate, "YYYY-MM-DDY").toDate()
      : null;

    const newGoal = new Goal({
      userId: createdBy,
      category,
      description,
      target,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      status,
    });

    await newGoal.save();
    res.json({ message: "Goal created successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error creating goal", error });
  }
};

// Function for staff to update their own goals
const updateGoalByStaff = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const goal = await Goal.findOne({ _id: id, userId });
    if (!goal) {
      return res
        .status(404)
        .json({ message: "Goal not found or not authorized to edit." });
    }

    const { category, description, target, startDate, endDate, status } =
      req.body;

    // Format dates if provided
    const formattedStartDate = startDate
      ? moment(startDate, "YYYY-MM-DD").toDate()
      : goal.startDate;
    const formattedEndDate = endDate
      ? moment(endDate, "YYYY-MM-DD").toDate()
      : goal.endDate;

    goal.category = category || goal.category; // Ensure valid category values
    goal.description = description || goal.description;
    goal.target = target || goal.target;
    goal.startDate = formattedStartDate;
    goal.endDate = formattedEndDate;
    goal.status = status || goal.status; // Ensure valid status

    await goal.save();
    res.json({ message: "Goal updated successfully by staff member." });
  } catch (error) {
    res.status(500).json({ message: "Error updating goal", error });
  }
};

// Function for staff to delete their own goals
const deleteGoalByStaff = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const goalToDelete = await Goal.findOne({ _id: id, userId });
    if (!goalToDelete) {
      return res
        .status(404)
        .json({ message: "Goal not found or not authorized to delete." });
    }

    await goalToDelete.remove();

    res.json({ message: "Goal deleted successfully by staff member." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting goal", error });
  }
};

module.exports = {
  getAllGoals,
  createGoal,
  updateGoal,
  deleteGoal,
  createGoalForStaff,
  updateGoalByStaff,
  deleteGoalByStaff,
};
