// backend/routes/cases.js
const express = require('express');
const router = express.Router();
const caseController = require('../controllers/caseController');

// Routes for cases
router.post('/cases', caseController.createCase);
router.get('/cases', caseController.getCases);
router.put('/cases/:id', caseController.updateCase);
router.delete('/cases/:id', caseController.deleteCase);

module.exports = router;
