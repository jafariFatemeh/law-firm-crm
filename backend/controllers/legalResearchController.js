const fs = require('fs');
const path = require('path');
const { analyzeText } = require('../services/legalResearchService');

exports.analyzeLegalDocument = async (req, res) => {
  try {
    const filePath = path.join(__dirname, '..', 'uploads', req.file.filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const analysis = await analyzeText(fileContent);
    res.status(200).json({ analysis });
  } catch (error) {
    console.error('Error analyzing legal document:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
