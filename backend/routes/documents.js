// backend/routes/documents.js
const express = require('express');
const router = express.Router();
const { getAllDocuments, addDocument } = require('../controllers/documentController');

router.get('/', getAllDocuments);
router.post('/', addDocument);

module.exports = router;
