// backend/controllers/documentController.js
const fs = require('fs');
const path = require('path');
const { analyzeText } = require('frontend/src/services/nlpService');

exports.analyzeContract = async (req, res) => {
  try {
    const filePath = path.join(__dirname, '..', 'uploads', req.file.filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const analysis = await analyzeText(fileContent);
    res.status(200).json({ analysis });
  } catch (error) {
    console.error('Error analyzing contract:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
