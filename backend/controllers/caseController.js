// backend/controllers/caseController.js
const Case = require('../models/Case');
const Client = require('../models/Client');

exports.addCase = async (req, res) => {
  try {
    const newCase = new Case(req.body);
    const savedCase = await newCase.save();
    await Client.findByIdAndUpdate(savedCase.client, { $push: { cases: savedCase._id } });
    res.status(201).json(savedCase);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllCases = async (req, res) => {
  try {
    const cases = await Case.find().populate('client');
    res.status(200).json(cases);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCaseById = async (req, res) => {
  try {
    const caseItem = await Case.findById(req.params.id).populate('client');
    if (!caseItem) return res.status(404).json({ error: 'Case not found' });
    res.status(200).json(caseItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateCase = async (req, res) => {
  try {
    const updatedCase = await Case.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCase) return res.status(404).json({ error: 'Case not found' });
    res.status(200).json(updatedCase);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCase = async (req, res) => {
  try {
    const deletedCase = await Case.findByIdAndDelete(req.params.id);
    if (!deletedCase) return res.status(404).json({ error: 'Case not found' });
    await Client.findByIdAndUpdate(deletedCase.client, { $pull: { cases: deletedCase._id } });
    res.status(200).json({ message: 'Case deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
