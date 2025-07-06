const express = require("express");
const {
  login,
  logout
} = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware"); // Corrected path

const router = express.Router();

// Public Route: Login
router.post("/login", login);

// Protected Route: Logout
router.post("/logout", verifyToken, logout);

module.exports = router;