
const express = require("express");
const jwt = require("jsonwebtoken"); 
const bcrypt = require("bcryptjs"); 
const User = require("../models/user"); 
require("dotenv").config(); // Load environment variables

// Function to register a new user
const registerUser = async (req, res) => {
  try {
    const { fname, lname, email, password } = req.body;

    // Validate user input (consider a more robust validation library)
    if (!fname || !lname || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user with the hashed password
    const newUser = new User({
      fname,
      lname,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Generate a JWT token 
    const payload = {
      user: {
        id: savedUser._id,
        email: savedUser.email,
        role: savedUser.role, // Include the role
      },
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    // Send successful response
    res.json({
      message: "Registration successful!",
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "An error occurred. Please try again." });
  }
};

// Function to log in a user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic input validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Both email and password are required." });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Generate a JWT token
    const payload = {
      user: {
        id: user._id,
        email: user.email,
        role: user.role, // Include the role
      },
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Send successful response
    res.json({
      message: "Login successful!",
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login.' });
  }
};

module.exports = { registerUser, loginUser };
