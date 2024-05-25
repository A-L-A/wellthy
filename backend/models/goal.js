const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ["fitness", "nutrition", "mentalHealth"],
    required: true,
  },
  target: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date, 
    required: true,
  },
  endDate: Date, 
  status: {
    type: String,
    enum: ["notStarted", "inProgress", "completed"],
    default: "notStarted",
  },
});

module.exports = mongoose.model("Goal", goalSchema);
