// backend/controllers/caseController.js
const Case = require('../models/Case');

// Create a new case
exports.createCase = async (req, res) => {
  try {
    const { title, description, client, status } = req.body;
    if (!title || !client) {
      return res.status(400).json({ message: 'Title and client are required' });
    }
    const newCase = new Case({ title, description, client, status });
    await newCase.save();
    res.status(201).json(newCase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all cases
exports.getCases = async (req, res) => {
  try {
    const cases = await Case.find().populate('client');
    res.status(200).json(cases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a case
exports.updateCase = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, client, status } = req.body;
    const updatedCase = await Case.findByIdAndUpdate(id, { title, description, client, status }, { new: true });
    res.status(200).json(updatedCase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a case
exports.deleteCase = async (req, res) => {
  try {
    const { id } = req.params;
    await Case.findByIdAndDelete(id);
    res.status(200).json({ message: 'Case deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
