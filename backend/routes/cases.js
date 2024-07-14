// backend/routes/cases.js
const express = require('express');
const router = express.Router();
const caseController = require('../controllers/caseController');

router.get('/', caseController.getCases);
router.post('/', caseController.createCase);

module.exports = router;
