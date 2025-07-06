const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const SupportAdminModel = require("../models/adminModel");
const { verifyToken } = require("../middleware/authMiddleware"); // Import the password email template function
require("dotenv").config();

// .......................................Login Controller.............................................//
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await SupportAdminModel.findByEmail(email);
    if (!admin)
      return res.status(404).json({ message: "Support Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: admin.id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ......................................Logout Controller.........................................//
exports.logout = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
