const db = require("../config/db");

// Requisition number generate
function generateReqNo() {
    return "REQ-" + Date.now();
}

// 1. CREATE REQUISITION (EMPLOYEE)
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

    const logSql = `
    INSERT INTO audit_logs
    (action, requisition_id)
    VALUES (?, ?)
     `;

    db.query(
    logSql,
    ["Requisition Created", result.insertId]
    );

    res.status(201).json({
            success: true,
            message: "Requisition Created Successfully",
            requisition_number
        });
    });
};

// 2. EMPLOYEE: MY REQUISITIONS
exports.getMyRequisitions = (req, res) => {
    const user_id = req.user.id;

    const sql = `
    SELECT
    r.*,
    a.driver_name,
    a.driver_phone,
    a.remarks,
    v.vehicle_number
   FROM requisitions r
   LEFT JOIN assignments a
     ON r.id = a.requisition_id
    LEFT JOIN vehicles v
    ON a.vehicle_id = v.id
WHERE r.user_id = ?
ORDER BY r.created_date DESC
`;
    db.query(sql, [user_id], (err, results) => {
        console.log(results);
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

// 3. ADMIN: ALL REQUISITIONS
exports.getAllRequisitions = (req, res) => {

    console.log("GET ALL REQUISITIONS API HIT");

    const sql = `
        SELECT r.*, u.name, u.email
        FROM requisitions r
        JOIN users u ON r.user_id = u.id
        ORDER BY r.created_date DESC
    `;

    db.query(sql, (err, results) => {

        if (err) {
            console.log("DB ERROR:", err);

            return res.status(500).json({
                success: false,
                error: err.message
            });
        }

        console.log("RESULTS:", results);

        res.json({
            success: true,
            data: results
        });
    });
};

// 4. ADMIN: UPDATE STATUS (APPROVE / REJECT)
exports.updateStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

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

        db.query(
    `INSERT INTO audit_logs (action, requisition_id)
     VALUES (?, ?)`,
    [`Request ${status}`, id]
);

        res.json({
            success: true,
            message: "Status Updated Successfully"
        });
    });
};

// 5. ADMIN: ASSIGN VEHICLE
exports.assignVehicle = (req, res) => {

    console.log("REQ BODY =", req.body);

    const {
        requisition_id,
        vehicle_id,
        driver_name,
        driver_phone,
        remarks
    } = req.body;

    const sql = `
    INSERT INTO assignments
    (requisition_id, vehicle_id, driver_name, driver_phone, remarks)
    VALUES (?, ?, ?, ?, ?)
`;
console.log(req.body);
    db.query(
    sql,
    [
        requisition_id,
        vehicle_id,
        driver_name,
        driver_phone,
        remarks
    ],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    error: err.message
                });
            }

            const updateSql = `
                UPDATE requisitions
                SET status = 'Approved'
                WHERE id = ?
            `;

            db.query(
                updateSql,
                [requisition_id],
                (updateErr, updateResult) => {

                    if (updateErr) {
                        return res.status(500).json({
                            success: false,
                            error: updateErr.message
                        });
                    }

                    const vehicleUpdateSql = `
                        UPDATE vehicles
                        SET status = 'Assigned'
                        WHERE id = ?
                    `;

                    db.query(
                        vehicleUpdateSql,
                        [vehicle_id],
                        (vehicleErr, vehicleResult) => {

                            if (vehicleErr) {
                                return res.status(500).json({
                                    success: false,
                                    error: vehicleErr.message
                                });
                            }


                            const logSql = `
    INSERT INTO audit_logs
    (action, requisition_id)
    VALUES (?, ?)
`;

db.query(
    logSql,
    ["Vehicle Assigned", requisition_id],
    (logErr, logResult) => {

        if (logErr) {
            console.log(logErr);
        }

        res.json({
            success: true,
            message: "Vehicle Assigned Successfully"
        });
    }
);

                        }
                    );
                }
            );
        }
    );
};


// 6. GET SINGLE REQUISITION
exports.getSingleRequisition = (req, res) => {
    const { id } = req.params;

    const sql = `
        SELECT * FROM requisitions 
        WHERE id = ?
    `;

    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                error: err.message
            });
        }

        res.json({
            success: true,
            data: results[0]
        });
    });
};

// 7. CANCEL REQUISITION
exports.cancelRequisition = (req, res) => {

    console.log("Cancel API Hit");
    console.log("ID:", req.params.id);

    const { id } = req.params;

    const sql = `
    UPDATE requisitions 
    SET status = 'Cancelled' 
    WHERE id = ? AND status = 'Pending'
`;

    db.query(sql, [id], (err, result) => {
         console.log(result);
        if (err) {
            return res.status(500).json({
                success: false,
                error: err.message
            });
        }

        db.query(
    `INSERT INTO audit_logs (action, requisition_id)
     VALUES (?, ?)`,
    ["Request Cancelled", id]
);


        res.json({
            success: true,
            message: "Requisition Cancelled Successfully"
        });
        
    });
};

// 8. GET AUDIT LOGS
exports.getAuditLogs = (req, res) => {

    const sql = `
        SELECT *
        FROM audit_logs
        ORDER BY id DESC
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