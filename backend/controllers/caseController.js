// backend/controllers/caseController.js
const Case = require('../models/Case');

exports.getAllCases = async (req, res) => {
  try {
    const cases = await Case.find().populate('client');
    res.json(cases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCase = async (req, res) => {
  const newCase = new Case(req.body);
  try {
    const savedCase = await newCase.save();
    res.status(201).json(savedCase);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateCase = async (req, res) => {
  try {
    const updatedCase = await Case.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCase);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteCase = async (req, res) => {
  try {
    await Case.findByIdAndDelete(req.params.id);
    res.json({ message: 'Case deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
