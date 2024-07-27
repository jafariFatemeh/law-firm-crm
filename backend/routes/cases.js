// backend/routes/cases.js
const express = require('express');
const { createCase, getCases, updateCase, deleteCase } = require('../controllers/caseController');
const router = express.Router();

router.post('/', createCase);
router.get('/', getCases);
router.put('/:id', updateCase);
router.delete('/:id', deleteCase);

module.exports = router;
