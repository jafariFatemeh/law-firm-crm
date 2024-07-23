// backend/routes/clients.js
const express = require('express');
const router = express.Router();
const { getAllClients, addClient } = require('../controllers/clientController');

router.get('/', clientController.getAllClients);
router.post('/', clientController.addClient);

module.exports = router;
