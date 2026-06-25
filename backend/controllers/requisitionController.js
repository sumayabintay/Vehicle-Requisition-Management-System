const db = require("../config/db");

// Requisition number generate
function generateReqNo() {
    return "REQ-" + Date.now();
}

//1. CREATE REQUISITION (EMPLOYEE)
exports.createRequisition = (req, res) => {

    const user_id = req.user.id;

    const {
        travel_date,
        pickup_location,
        destination,
        purpose,
        passenger_count,
        duration,
        priority
    } = req.body;

    const requisition_number = generateReqNo();

    const sql = `
        INSERT INTO requisitions 
        (requisition_number, user_id, travel_date, pickup_location, destination, purpose, passenger_count, duration, priority, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending')
    `;

    db.query(sql, [
        requisition_number,
        user_id,
        travel_date,
        pickup_location,
        destination,
        purpose,
        passenger_count,
        duration,
        priority
    ], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                error: err.message
            });
        }

        res.status(201).json({
            success: true,
            message: "Requisition Created Successfully",
            requisition_number
        });
    });
};



//2. EMPLOYEE: MY REQUISITIONS

exports.getMyRequisitions = (req, res) => {

    const user_id = req.user.id;

    const sql = `
        SELECT * FROM requisitions 
        WHERE user_id = ?
        ORDER BY created_date DESC
    `;

    db.query(sql, [user_id], (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                error: err.message
            });
        }

        res.json({
            success: true,
            data: results
        });
    });
};



//3. ADMIN: ALL REQUISITIONS

exports.getAllRequisitions = (req, res) => {

    const sql = `
        SELECT r.*, u.name, u.email
        FROM requisitions r
        JOIN users u ON r.user_id = u.id
        ORDER BY r.created_date DESC
    `;

    db.query(sql, (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                error: err.message
            });
        }

        res.json({
            success: true,
            data: results
        });
    });
};


//4. ADMIN: UPDATE STATUS (APPROVE / REJECT)

exports.updateStatus = (req, res) => {

    const { id } = req.params;
    const { status } = req.body; // Approved / Rejected

    const sql = `
        UPDATE requisitions 
        SET status = ?
        WHERE id = ?
    `;

    db.query(sql, [status, id], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                error: err.message
            });
        }

        res.json({
            success: true,
            message: "Status Updated Successfully"
        });
    });
};

//5. ADMIN: ASSIGN VEHICLE

exports.assignVehicle = (req, res) => {

    const { requisition_id, vehicle_id, driver_name, remarks } = req.body;

    const sql = `
        INSERT INTO assignments 
        (requisition_id, vehicle_id, driver_name, remarks)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [requisition_id, vehicle_id, driver_name, remarks], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                error: err.message
            });
        }

        // requisition status update
        const updateSql = `UPDATE requisitions SET status='Completed' WHERE id=?`;

        db.query(updateSql, [requisition_id]);

        res.json({
            success: true,
            message: "Vehicle Assigned Successfully"
        });
    });
};