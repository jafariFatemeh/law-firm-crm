// backend/routes/documents.js
const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');

router.post('/documents', documentController.createDocument);
router.get('/documents', documentController.getDocuments);
router.put('/documents/:id', documentController.updateDocument);
router.delete('/documents/:id', documentController.deleteDocument);

module.exports = router;
