const express = require("express");
const router = express.Router();

const {
    createRequisition,
    getMyRequisitions,
    getAllRequisitions,
    updateStatus,
    assignVehicle,
    getSingleRequisition,
    cancelRequisition,
    getAuditLogs
} = require("../controllers/requisitionController");

// JWT middleware
const auth = require("../middleware/auth");


// EMPLOYEE ROUTES
router.post("/create", auth, createRequisition);

router.get("/my", auth, getMyRequisitions);

router.put("/cancel/:id", auth, cancelRequisition);

router.get(
  "/audit-logs",
  auth,
  getAuditLogs
);



// ADMIN ROUTES
router.get("/all", auth, getAllRequisitions);

router.put("/status/:id", auth, updateStatus);

router.post("/assign", auth, (req, res, next) => {
    console.log("ASSIGN ROUTE HIT");
    console.log(req.body);
    next();
}, assignVehicle);





// TEST ROUTE
router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Requisition Route Working"
    });
});

// SINGLE REQUISITION //always keep this last
router.get("/:id", auth, getSingleRequisition);

module.exports = router;