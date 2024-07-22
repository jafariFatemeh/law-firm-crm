// controllers/dashboardController.js
const Case = require('../models/Case');
const Client = require('../models/Client');
const Communication = require('../models/Communication');
const Document = require('../models/Document');

exports.getDashboardData = async (req, res) => {
  try {
    const cases = await Case.find().countDocuments();
    const clients = await Client.find().countDocuments();
    const communications = await Communication.find().countDocuments();
    const documents = await Document.find().countDocuments();

    res.json({ cases, clients, communications, documents });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
