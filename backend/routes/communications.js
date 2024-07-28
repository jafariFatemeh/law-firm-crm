// backend/routes/communications.js
const express = require('express');
const { createCommunication, getCommunicationsByCase, deleteCommunication } = require('../controllers/communicationController');
const router = express.Router();

router.post('/', createCommunication);
router.get('/case/:caseId', getCommunicationsByCase);
router.delete('/:id', deleteCommunication);

module.exports = router;
