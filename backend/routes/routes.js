const express = require("express");
const router = express.Router();

// Controllers
const goalController = require("../controllers/goalController");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

// Middleware
const { protect } = require("../middleware/protectMiddleware");
const { permit } = require("../middleware/permitMiddleware");

// Helper function to check if the user is an admin or staff
const isAdminOrStaff = (req, res, next) => {
  if (req.user.role === "admin" || req.user.role === "staff") {
    next();
  } else {
    res.status(403).json({ message: "Access denied" });
  }
};

// Protected routes for admin and staff
router.get("/goals", protect, isAdminOrStaff, goalController.getAllGoals);
router.post("/goals", protect, isAdminOrStaff, goalController.createGoal);
router.put("/goals/:id", protect, isAdminOrStaff, goalController.updateGoal);
router.delete("/goals/:id", protect, isAdminOrStaff, goalController.deleteGoal);

// Authentication routes
router.post("/register", protect, permit("admin"), authController.registerUser);
router.post("/login", authController.loginUser);

// User management routes
router.get("/users", protect, permit("admin"), userController.getAllUsers);
router.put("/users/:id", protect, permit("admin"), userController.updateUser);
router.post("/users", protect, permit("admin"), userController.createUser);
router.delete(
  "/users/:id",
  protect,
  permit("admin"),
  userController.deleteUser
);

module.exports = router;
