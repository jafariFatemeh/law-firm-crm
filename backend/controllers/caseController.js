// backend/controllers/caseController.js
const Case = require('../models/Case');

// Create a new case
exports.createCase = async (req, res) => {
  const { title, description, date } = req.body;
  try {
    const newCase = new Case({
      title,
      description,
      date,
    });
    const savedCase = await newCase.save();
    res.status(201).json(savedCase);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all cases
exports.getCases = async (req, res) => {
  try {
    const cases = await Case.find();
    res.status(200).json(cases);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get a specific case by ID
exports.getCaseById = async (req, res) => {
  try {
    const foundCase = await Case.findById(req.params.id);
    if (!foundCase) {
      return res.status(404).json({ error: 'Case not found' });
    }
    res.status(200).json(foundCase);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a specific case by ID
exports.updateCase = async (req, res) => {
  try {
    const updatedCase = await Case.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedCase) {
      return res.status(404).json({ error: 'Case not found' });
    }
    res.status(200).json(updatedCase);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a specific case by ID
exports.deleteCase = async (req, res) => {
  try {
    const deletedCase = await Case.findByIdAndDelete(req.params.id);
    if (!deletedCase) {
      return res.status(404).json({ error: 'Case not found' });
    }
    res.status(200).json({ message: 'Case deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
