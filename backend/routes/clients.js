// backend/routes/clients.js
const express = require('express');
const router = express.Router();
const { getAllClients, addClient } = require('../controllers/clientController');

router.get('/', getAllClients);
router.post('/', addClient);

module.exports = router;
