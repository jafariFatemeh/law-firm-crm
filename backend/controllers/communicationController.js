// backend/controllers/communicationController.js
// controllers/communicationsController.js
const Communication = require('../models/Communication');

const getAllCommunications = async (req, res) => {
  try {
    const communications = await Communication.find().populate('case');
    res.json(communications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCommunication = async (req, res) => {
  const { title, content, case: caseId } = req.body;
  
  if (!title || !content || !caseId) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const communication = new Communication({ title, content, case: caseId });

  try {
    const newCommunication = await communication.save();
    res.status(201).json(newCommunication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateCommunication = async (req, res) => {
  const { title, content, case: caseId } = req.body;

  if (!title || !content || !caseId) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const updatedCommunication = await Communication.findByIdAndUpdate(
      req.params.id,
      { title, content, case: caseId },
      { new: true }
    ).populate('case');
    if (!updatedCommunication) {
      return res.status(404).json({ message: 'Communication not found' });
    }
    res.json(updatedCommunication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteCommunication = async (req, res) => {
  try {
    const deletedCommunication = await Communication.findByIdAndDelete(req.params.id);
    if (!deletedCommunication) {
      return res.status(404).json({ message: 'Communication not found' });
    }
    res.json({ message: 'Communication deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCommunications,
  createCommunication,
  updateCommunication,
  deleteCommunication
};
