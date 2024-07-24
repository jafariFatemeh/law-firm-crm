// backend/routes/clients.js
const express = require('express');
const { getClients, createClient, updateClient, deleteClient } = require('../controllers/clientController');
const router = express.Router();

router.get('/', getClients);
router.post('/', createClient);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);

module.exports = router;
