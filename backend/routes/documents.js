// backend/routes/documents.js
const express = require('express');
const { createDocument, getDocumentsByCase, deleteDocument, upload } = require('../controllers/documentController');
const router = express.Router();

router.post('/', upload.single('file'), createDocument);
router.get('/case/:caseId', getDocumentsByCase);
router.delete('/:id', deleteDocument);

module.exports = router;
