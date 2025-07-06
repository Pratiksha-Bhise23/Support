const express = require("express");
const router = express.Router();
const { getBookingHistory } = require("../controllers/bookingController");

// GET /api/bookings/history
router.get("/history", getBookingHistory);

module.exports = router;
