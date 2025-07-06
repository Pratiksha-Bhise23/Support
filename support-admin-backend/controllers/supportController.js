const pool = require("../config/db");
const { sendSupportIssueEmail } = require("../services/mailService");

// Create support issue
exports.createSupportIssue = async (req, res) => {
  const { booking_id, issue_type, description } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO support_issues (booking_id, issue_type, description)
       VALUES ($1, $2, $3) RETURNING *`,
      [booking_id, issue_type, description]
    );

    const issue = result.rows[0];

    // Fetch user info
    const userResult = await pool.query(
      `SELECT u.name, u.email FROM bookings b JOIN users u ON b.user_id = u.id WHERE b.id = $1`,
      [booking_id]
    );

    const { name, email } = userResult.rows[0];

    // Send email to user
    await sendSupportIssueEmail(
      email,
      name,
      issue.id,
      description,
      issue.status,
      issue.created_at,
      'created'
    );

    res.status(201).json(issue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all support issues
exports.getAllSupportIssues = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT si.*, u.name AS user_name, b.total_price
       FROM support_issues si
       JOIN bookings b ON si.booking_id = b.id
       JOIN users u ON b.user_id = u.id
       ORDER BY si.created_at DESC`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get issue details with booking info
exports.getSupportIssueById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT 
         si.id AS issue_id,
         si.issue_type,
         si.description,
         si.status AS issue_status,
         si.support_reply,
         si.created_at AS issue_created_at,
         b.id AS booking_id,
         b.pnr,
         b.total_price,
         b.status AS booking_status,
         b.created_at AS booking_created_at,
         u.name AS user_name,
         u.email AS user_email
       FROM support_issues si
       JOIN bookings b ON si.booking_id = b.id
       JOIN users u ON b.user_id = u.id
       WHERE si.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Issue not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update support reply and status
exports.updateSupportIssue = async (req, res) => {
  const { id } = req.params;
  const { support_reply, status } = req.body;

  try {
    const result = await pool.query(
      `UPDATE support_issues
       SET support_reply = $1, status = $2, updated_at = CURRENT_TIMESTAMP
       WHERE id = $3 RETURNING *`,
      [support_reply, status, id]
    );

    const updatedIssue = result.rows[0];

    // Get user info
    const userResult = await pool.query(
      `SELECT u.name, u.email FROM bookings b JOIN users u ON b.user_id = u.id WHERE b.id = $1`,
      [updatedIssue.booking_id]
    );

    const { name, email } = userResult.rows[0];

    // Send update email
    await sendSupportIssueEmail(
      email,
      name,
      updatedIssue.id,
      support_reply,
      updatedIssue.status,
      updatedIssue.updated_at,
      'updated'
    );

    res.json(updatedIssue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
