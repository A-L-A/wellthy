require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

// Import routes
const routes = require("./routes/routes");
app.use("/", routes);

// Import models
const User = require("./models/user");
const Event = require("./models/goal");

// MongoDB Connection URL
const mongoUrl = process.env.MONGO_URL;

// Connect to MongoDB
mongoose
  .connect(mongoUrl, {})
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Starting the server
app.listen(process.env.PORT || 3001, () => {
  console.log(`Server started on port ${process.env.PORT || 3001}`);
});
