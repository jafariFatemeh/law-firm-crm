// routes/dashboard.js
const express = require('express');
const router = express.Router();
const { getDashboardData } = require('../controllers/dashboardController');

router.get('/', dashboardController.getDashboardData);

module.exports = router;
