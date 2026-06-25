const express = require("express");
require("dotenv").config();
require("./config/db");

const userRoutes = require("./routes/userRoutes");
const requisitionRoutes = require("./routes/requisitionRoutes");

const app = express();

// middleware
app.use(express.json());

// routes
app.use("/api/users", userRoutes);
app.use("/api/requisitions", requisitionRoutes);

// home route
app.get("/", (req, res) => {
  res.send("Vehicle Requisition Management System API");
});

module.exports = app;