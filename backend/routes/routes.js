const express = require("express");
const router = express.Router();

// Controllers
const goalController = require("../controllers/goalController");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

// Middleware
const { protect } = require("../middleware/protectMiddleware");
const { permit } = require("../middleware/permitMiddleware");

// Protected routes for admin
router.get(
  "/goals",
  protect,
  permit(["admin", "staff"]),
  goalController.getAllGoals
);
router.post(
  "/goals",
  protect,
  permit(["admin", "staff"]),
  goalController.createGoal
);
router.put(
  "/goals/:id",
  protect,
  permit(["admin", "staff"]),
  goalController.updateGoal
);
router.delete(
  "/goals/:id",
  protect,
  permit(["admin", "staff"]),
  goalController.deleteGoal
);

// Authentication routes
router.post("/register",protect, permit("admin"), authController.registerUser);
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
