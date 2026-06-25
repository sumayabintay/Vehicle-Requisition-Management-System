const express = require("express");
const router = express.Router();

const {
    createRequisition,
    getMyRequisitions,
    getAllRequisitions,
    updateStatus,
    assignVehicle
} = require("../controllers/requisitionController");

// JWT middleware (auth)
const auth = require("../middleware/auth");


// EMPLOYEE ROUTES

router.post("/create", auth, createRequisition);
router.get("/my", auth, getMyRequisitions);



//ADMIN ROUTES

router.get("/all", auth, getAllRequisitions);
router.put("/status/:id", auth, updateStatus);
router.post("/assign", auth, assignVehicle);


module.exports = router;