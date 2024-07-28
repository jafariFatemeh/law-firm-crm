// backend/routes/communications.js
const express = require('express');
const router = express.Router();
const communicationsController = require('../controllers/communicationController');

// Get all communications
router.get('/', communicationsController.getAllCommunications);

// Create a new communication
router.post('/', communicationsController.createCommunication);

// Update an existing communication
router.put('/:id', communicationsController.updateCommunication);

// Delete a communication
router.delete('/:id', communicationsController.deleteCommunication);

module.exports = router;
