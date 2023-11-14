const passport = require("passport");
const bcrypt = require("bcrypt");
const Alumni = require("../models/alumni");

// Function to register a new user
const registerUser = async (req, res) => {
  try {
    const { fname, lname, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await Alumni.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    const newUser = new Alumni({ fname, lname, email, password });

    // Use bcrypt to hash the user's password before saving to the database
    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;

      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;

        newUser.password = hash;
        newUser.save();
        res.json({ message: "User registered successfully." });
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering user.", error });
  }
};

// Function to log in a user
const loginUser = passport.authenticate("local", { session: false });

// Function to log out a user
const logoutUser = (req, res) => {
  req.logout();
  res.json({ message: "Logout successful." });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
