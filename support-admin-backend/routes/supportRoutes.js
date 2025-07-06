const express = require('express');
const router = express.Router();
const {
  createSupportIssue,
  getAllSupportIssues,
  getSupportIssueById,
  updateSupportIssue
} = require('../controllers/supportController');

router.post('/', createSupportIssue);
router.get('/', getAllSupportIssues);
router.get('/:id', getSupportIssueById);
router.put('/:id', updateSupportIssue);

module.exports = router;
