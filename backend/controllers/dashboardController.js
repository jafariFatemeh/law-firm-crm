// controllers/dashboardController.js
const Client = require('../models/Client');
const Case = require('../models/Case');
const Document = require('../models/Document');
const Communication = require('../models/Communication');

const getDashboardData = async (req, res) => {
  try {
    const clients = await Client.find();
    const cases = await Case.find();
    const documents = await Document.find();
    const communications = await Communication.find();

    const data = {
      clients: clients.length,
      cases: cases.length,
      documents: documents.length,
      communications: communications.length,
    };

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getDashboardData,
};
