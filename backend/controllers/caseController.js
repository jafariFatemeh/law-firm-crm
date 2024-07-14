// backend/controllers/caseController.js
const Case = require('../models/Case');

exports.getCases = async (req, res) => {
  try {
    const cases = await Case.find().populate('clientId');
    res.json(cases);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cases' });
  }
};

exports.createCase = async (req, res) => {
  try {
    const newCase = new Case(req.body);
    const savedCase = await newCase.save();
    res.json(savedCase);
  } catch (error) {
    res.status(500).json({ message: 'Error creating case' });
  }
};
