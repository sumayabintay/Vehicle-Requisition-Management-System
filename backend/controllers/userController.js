const connection = require("../config/db");
const jwt = require("jsonwebtoken");

// Register User
const registerUser = (req, res) => {
  const { name, email, password, role } = req.body;

  const sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";

  connection.query(
    sql,
    [name, email, password, role],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: err.message,
        });
      }

      res.status(201).json({
        success: true,
        message: "User Registered Successfully",
      });
    }
  );
};

// Login User
const loginUser = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";

  connection.query(sql, [email], (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const user = results[0];

    // Direct plain text password comparison
    if (password !== user.password) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    // Generate JWT Token if password matches
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      "secretkey",
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      role: user.role,
    });
  });
};

module.exports = {
  registerUser,
  loginUser,
};