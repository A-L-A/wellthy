const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const router = express.Router();
const Alumni = require("../models/alumni");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/authController");
const {
  getAllAlumni,
  getAlumniById,
  createAlumni,
  updateAlumni,
  deleteAlumni,
} = require("../controllers/alumniController");

// Authentication routes
router.post("/signup", registerUser);
router.post("/login", loginUser, (req, res) => {
  // If the login is successful, you might want to send additional user information
  res.json({ message: "Login successful.", user: req.user });
});
router.get("/logout", logoutUser);

// Alumni routes
router.get("/alumni", getAllAlumni);
router.get("/alumni/:id", getAlumniById);
router.post("/alumni", createAlumni);
router.put("/alumni/:id", updateAlumni);
router.delete("/alumni/:id", deleteAlumni);

// Add more routes as needed

module.exports = router;
