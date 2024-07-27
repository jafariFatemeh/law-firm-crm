// backend/controllers/documentController.js
const Document = require('../models/Document');

exports.getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.find().populate('case');
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createDocument = async (req, res) => {
  const newDocument = new Document(req.body);
  try {
    const savedDocument = await newDocument.save();
    res.status(201).json(savedDocument);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateDocument = async (req, res) => {
  try {
    const updatedDocument = await Document.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedDocument);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteDocument = async (req, res) => {
  try {
    await Document.findByIdAndDelete(req.params.id);
    res.json({ message: 'Document deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
