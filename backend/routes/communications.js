// backend/routes/communications.js
const express = require('express');
const router = express.Router();
const communicationController = require('../controllers/communicationController');

router.post('/communications', communicationController.createCommunication);
router.get('/communications', communicationController.getCommunications);
router.put('/communications/:id', communicationController.updateCommunication);
router.delete('/communications/:id', communicationController.deleteCommunication);

module.exports = router;
