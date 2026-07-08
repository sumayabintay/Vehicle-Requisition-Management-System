const express = require("express");
require("dotenv").config();
require("./config/db");
const cors = require("cors"); 

const userRoutes = require("./routes/userRoutes");
const requisitionRoutes = require("./routes/requisitionRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");

const app = express();

// Middleware configuration
app.use(cors({
  origin: "*",
  credentials: true
})); 
app.use(express.json());

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/requisitions", requisitionRoutes);
app.use("/api/vehicles", vehicleRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("Vehicle Requisition Management System API");
});

module.exports = app;


