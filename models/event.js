const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: {
    type: String,
    enum: ["professional", "networking", "campus"],
    required: true,
  },
  date: { type: Date, required: true },
  time: { type: String, required: true }, 
  description: String,
});


module.exports = mongoose.model("Events", eventSchema);
