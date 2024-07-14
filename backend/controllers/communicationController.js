// backend/controllers/communicationController.js
const Communication = require('../models/Communication');

exports.getCommunications = async (req, res) => {
  try {
    const communications = await Communication.find().populate('clientId');
    res.json(communications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching communications' });
  }
};

exports.createCommunication = async (req, res) => {
  try {
    const newCommunication = new Communication(req.body);
    const savedCommunication = await newCommunication.save();
    res.json(savedCommunication);
  } catch (error) {
    res.status(500).json({ message: 'Error creating communication' });
  }
};
