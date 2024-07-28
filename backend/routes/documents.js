// backend/routes/documents.js
const express = require('express');
const router = express.Router();
const documentsController = require('../controllers/documentController');

// Get all documents
router.get('/', documentsController.getAllDocuments);

// Create a new document
router.post('/', documentsController.createDocument);

// Update an existing document
router.put('/:id', documentsController.updateDocument);

// Delete a document
router.delete('/:id', documentsController.deleteDocument);

module.exports = router;
