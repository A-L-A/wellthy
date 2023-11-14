const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const authController = require("../controllers/authController");
const alumniController = require("../controllers/alumniController");
const adminController = require("../controllers/adminController"); // Corrected import


// Event routes
router.get('/events', eventController.getAllEvents);
router.post('/events', eventController.createEvent);
router.put('/events/:id', eventController.updateEvent);
router.delete('/events/:id', eventController.deleteEvent);

// Auth routes
router.post("/signup", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/logout", authController.logoutUser);

// Alumni routes
router.get("/alumni", alumniController.getAllAlumni);
router.post("/alumni", alumniController.createAlumni);
router.put("/alumni/:id", alumniController.updateAlumni);
router.delete("/alumni/:id", alumniController.deleteAlumni);

// Admin routes
router.get("/admin", adminController.getAllAdmin); 
router.post("/admin", adminController.createAdmin); 
router.put("/admin/:id", adminController.updateAdmin); 
router.delete("/admin/:id", adminController.deleteAdmin); 

module.exports = router;
