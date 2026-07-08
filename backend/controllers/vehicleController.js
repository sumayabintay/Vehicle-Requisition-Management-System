const db = require("../config/db");

// 1. ADD VEHICLE
exports.createVehicle = (req, res) => {

    const {
        vehicle_number,
        model,
        capacity,
        status
    } = req.body;

    const sql = `
        INSERT INTO vehicles
        (vehicle_number, model, capacity, status)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [vehicle_number, model, capacity, status],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    error: err.message
                });
            }

            res.status(201).json({
                success: true,
                message: "Vehicle Added Successfully"
            });
        }
    );
};


// 2. GET ALL VEHICLES
exports.getVehicles = (req, res) => {

    const sql = `SELECT * FROM vehicles`;

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


// 3. UPDATE VEHICLE
exports.updateVehicle = (req, res) => {

    const { id } = req.params;

    const {
        vehicle_number,
        model,
        capacity,
        status
    } = req.body;

    const sql = `
        UPDATE vehicles
        SET vehicle_number=?, model=?, capacity=?, status=?
        WHERE id=?
    `;

    db.query(
        sql,
        [vehicle_number, model, capacity, status, id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    error: err.message
                });
            }

            res.json({
                success: true,
                message: "Vehicle Updated Successfully"
            });
        }
    );
};