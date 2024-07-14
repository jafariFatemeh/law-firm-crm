// backend/routes/communications.js
const express = require('express');
const router = express.Router();
const communicationController = require('../controllers/communicationController');

router.get('/', communicationController.getCommunications);
router.post('/', communicationController.createCommunication);

module.exports = router;
