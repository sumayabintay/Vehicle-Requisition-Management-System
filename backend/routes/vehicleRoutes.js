const express = require("express");
const router = express.Router();

const {
    createVehicle,
    getVehicles,
    updateVehicle
} = require("../controllers/vehicleController");

const auth = require("../middleware/auth");

// Add Vehicle
router.post("/create", auth, createVehicle);

// Get All Vehicles
router.get("/", auth, getVehicles);

// Update Vehicle
router.put("/:id", auth, updateVehicle);

module.exports = router;


