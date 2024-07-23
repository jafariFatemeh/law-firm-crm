// backend/routes/communications.js
const express = require('express');
const router = express.Router();
const { getAllCommunications, addCommunication } = require('../controllers/communicationController');

router.get('/', getAllCommunications);
router.post('/', addCommunication);

module.exports = router;
