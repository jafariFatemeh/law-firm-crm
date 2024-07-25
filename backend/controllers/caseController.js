// backend/controllers/caseController.js
const Case = require('../models/Case');

// Add a new case
exports.addCase = async (req, res) => {
  try {
    const newCase = new Case(req.body);
    await newCase.save();
    res.status(201).json(newCase);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all cases
exports.getAllCases = async (req, res) => {
  try {
    const cases = await Case.find();
    res.json(cases);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a case by ID
exports.getCaseById = async (req, res) => {
  try {
    const caseData = await Case.findById(req.params.id);
    if (!caseData) return res.status(404).json({ message: 'Case not found' });
    res.json(caseData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a case
exports.updateCase = async (req, res) => {
  try {
    const caseData = await Case.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!caseData) return res.status(404).json({ message: 'Case not found' });
    res.json(caseData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a case
exports.deleteCase = async (req, res) => {
  try {
    const caseData = await Case.findByIdAndDelete(req.params.id);
    if (!caseData) return res.status(404).json({ message: 'Case not found' });
    res.json({ message: 'Case deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
