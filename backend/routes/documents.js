// backend/routes/documents.js
const express = require('express');
const router = express.Router();
const { getAllDocuments, addDocument } = require('../controllers/documentController');

router.get('/', documentController.getAllDocuments);
router.post('/', documentController.addDocument);

module.exports = router;
