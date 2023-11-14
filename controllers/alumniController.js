const Alumni = require("../models/alumni");

// Function to get all alumni records
const getAllAlumni = async (req, res) => {
  try {
    const alumni = await Alumni.find();
    res.json(alumni);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to get a specific alumni record by ID
const getAlumniById = async (req, res) => {
  try {
    const alumni = await Alumni.findById(req.params.id);
    if (!alumni) {
      return res.status(404).json({ message: "Alumni not found." });
    }
    res.json(alumni);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to create a new alumni record
const createAlumni = async (req, res) => {
  const { fname, lname, email, password } = req.body;

  // Validate input
  if (!fname || !lname || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const newAlumni = new Alumni({ fname, lname, email, password });

  try {
    const savedAlumni = await newAlumni.save();
    res.status(201).json(savedAlumni);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Function to update an existing alumni record by ID
const updateAlumni = async (req, res) => {
  const { fname, lname, email, password } = req.body;

  // Validate input
  if (!fname || !lname || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const updatedAlumni = await Alumni.findByIdAndUpdate(
      req.params.id,
      { fname, lname, email, password },
      { new: true } // Return the updated document
    );

    if (!updatedAlumni) {
      return res.status(404).json({ message: "Alumni not found." });
    }

    res.json(updatedAlumni);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to delete an alumni record by ID
const deleteAlumni = async (req, res) => {
  try {
    const deletedAlumni = await Alumni.findByIdAndDelete(req.params.id);

    if (!deletedAlumni) {
      return res.status(404).json({ message: "Alumni not found." });
    }

    res.json({ message: "Alumni deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllAlumni,
  getAlumniById,
  createAlumni,
  updateAlumni,
  deleteAlumni,
};
