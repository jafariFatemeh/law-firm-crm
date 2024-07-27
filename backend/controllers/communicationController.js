// backend/controllers/communicationController.js
const Communication = require('../models/Communication');

// Create a new communication
exports.createCommunication = async (req, res) => {
  try {
    const communication = new Communication(req.body);
    await communication.save();
    res.status(201).json(communication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all communications
exports.getCommunications = async (req, res) => {
  try {
    const communications = await Communication.find().populate('case');
    res.status(200).json(communications);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a communication
exports.updateCommunication = async (req, res) => {
  try {
    const communication = await Communication.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(communication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a communication
exports.deleteCommunication = async (req, res) => {
  try {
    await Communication.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
