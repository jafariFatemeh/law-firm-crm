// backend/routes/communications.js
const express = require('express');
const router = express.Router();
const { getAllCommunications, addCommunication } = require('../controllers/communicationController');

router.get('/', communicationController.getAllCommunications);
router.post('/', communicationController.addCommunication);

module.exports = router;
