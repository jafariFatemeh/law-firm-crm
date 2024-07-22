// backend/routes/cases.js
const express = require('express');
const router = express.Router();
const { getAllCases, addCase } = require('../controllers/caseController');

router.get('/', getAllCases);
router.post('/', addCase);

module.exports = router;
