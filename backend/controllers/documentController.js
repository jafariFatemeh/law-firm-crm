// backend/controllers/documentController.js
const Document = require('../models/Document');

exports.getDocuments = async (req, res) => {
  try {
    const documents = await Document.find().populate('caseId');
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching documents' });
  }
};

exports.createDocument = async (req, res) => {
  try {
    const newDocument = new Document(req.body);
    const savedDocument = await newDocument.save();
    res.json(savedDocument);
  } catch (error) {
    res.status(500).json({ message: 'Error creating document' });
  }
};
