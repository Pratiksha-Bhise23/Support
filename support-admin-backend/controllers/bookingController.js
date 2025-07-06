


const pool = require("../config/db");

// Get all booking history
const getBookingHistory = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        id AS booking_id,
        user_id,
        flight_id,
        status,
        total_price,
        created_at AS booking_date
      FROM bookings
      ORDER BY created_at DESC
    `);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching booking history:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getBookingHistory,
};
