// backend/routes/cases.js
const express = require('express');
const router = express.Router();
const caseController = require('../controllers/caseController');

// Define routes and attach controller methods
router.get('/', caseController.getCases);
router.post('/', caseController.createCase);
router.get('/:id', caseController.getCaseById);
router.put('/:id', caseController.updateCase);
router.delete('/:id', caseController.deleteCase);

module.exports = router;
