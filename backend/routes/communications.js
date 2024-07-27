// backend/routes/communications.js
const express = require('express');
const router = express.Router();
const communicationController = require('../controllers/communicationController');

router.post('/', communicationController.createCommunication);
router.get('/', communicationController.getCommunications);
router.put('/:id', communicationController.updateCommunication);
router.delete('/:id', communicationController.deleteCommunication);

module.exports = router;
