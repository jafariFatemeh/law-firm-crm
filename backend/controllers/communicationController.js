// backend/controllers/communicationController.js
const Communication = require('../models/Communication');

// Create new communication
exports.createCommunication = async (req, res) => {
  try {
    const { caseId, type, content } = req.body;
    if (!caseId || !type || !content) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const newCommunication = new Communication({ caseId, type, content });
    await newCommunication.save();
    res.status(201).json(newCommunication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all communications for a specific case
exports.getCommunicationsByCase = async (req, res) => {
  try {
    const { caseId } = req.params;
    const communications = await Communication.find({ caseId });
    res.status(200).json(communications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete communication
exports.deleteCommunication = async (req, res) => {
  try {
    const { id } = req.params;
    await Communication.findByIdAndDelete(id);
    res.status(200).json({ message: 'Communication deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
