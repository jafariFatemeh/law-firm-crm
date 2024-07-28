// backend/controllers/caseController.js
const Case = require('../models/Case');

// Create new case
exports.createCase = async (req, res) => {
  try {
    const { title, description, status, assignedTo } = req.body;
    if (!title || !description || !status || !assignedTo) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const newCase = new Case({ title, description, status, assignedTo });
    await newCase.save();
    res.status(201).json(newCase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all cases
exports.getCases = async (req, res) => {
  try {
    const cases = await Case.find().populate('assignedTo');
    res.status(200).json(cases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update case
exports.updateCase = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, assignedTo } = req.body;
    if (!title || !description || !status || !assignedTo) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const updatedCase = await Case.findByIdAndUpdate(id, { title, description, status, assignedTo }, { new: true });
    res.status(200).json(updatedCase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete case
exports.deleteCase = async (req, res) => {
  try {
    const { id } = req.params;
    await Case.findByIdAndDelete(id);
    res.status(200).json({ message: 'Case deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
