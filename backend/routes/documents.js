// backend/routes/documents.js
const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');

router.post('/', documentController.addDocument);
router.get('/', documentController.getAllDocuments);
router.get('/:id', documentController.getDocumentById);
router.delete('/:id', documentController.deleteDocument);

module.exports = router;
