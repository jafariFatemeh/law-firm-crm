// backend/controllers/communicationController.js
const Communication = require('../models/Communication');

// Get all communications
exports.getCommunications = async (req, res) => {
  try {
    const communications = await Communication.find().populate('client');
    res.json(communications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching communications', error });
  }
};

// Get a single communication by ID
exports.getCommunicationById = async (req, res) => {
  try {
    const communication = await Communication.findById(req.params.id).populate('client');
    if (!communication) return res.status(404).json({ message: 'Communication not found' });
    res.json(communication);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching communication', error });
  }
};

// Create a new communication
exports.createCommunication = async (req, res) => {
  try {
    const newCommunication = new Communication(req.body);
    await newCommunication.save();
    res.status(201).json(newCommunication);
  } catch (error) {
    res.status(500).json({ message: 'Error creating communication', error });
  }
};

// Update a communication
exports.updateCommunication = async (req, res) => {
  try {
    const updatedCommunication = await Communication.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCommunication) return res.status(404).json({ message: 'Communication not found' });
    res.json(updatedCommunication);
  } catch (error) {
    res.status(500).json({ message: 'Error updating communication', error });
  }
};

// Delete a communication
exports.deleteCommunication = async (req, res) => {
  try {
    const deletedCommunication = await Communication.findByIdAndDelete(req.params.id);
    if (!deletedCommunication) return res.status(404).json({ message: 'Communication not found' });
    res.json({ message: 'Communication deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting communication', error });
  }
};
