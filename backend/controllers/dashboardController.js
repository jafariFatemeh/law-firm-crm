// controllers/dashboardController.js
const Case = require('../models/Case');
const Client = require('../models/Client');
const Document = require('../models/Document');
const Communication = require('../models/Communication');

const getDashboardData = async (req, res) => {
  try {
    const recentCases = await Case.find().sort({ date: -1 }).limit(5);
    const recentClients = await Client.find().sort({ date: -1 }).limit(5);
    const upcomingDeadlines = await Document.find({ deadline: { $gte: new Date() } }).sort({ deadline: 1 }).limit(5);

    res.json({
      recentCases,
      recentClients,
      upcomingDeadlines,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching dashboard data' });
  }
};

module.exports = {
  getDashboardData,
};

