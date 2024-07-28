// backend/controllers/documentController.js
const Document = require('../models/Document');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

exports.upload = multer({ storage });

// Create new document
exports.createDocument = async (req, res) => {
  try {
    const { title, caseId } = req.body;
    const fileUrl = req.file.path;
    if (!title || !caseId || !fileUrl) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const newDocument = new Document({ title, caseId, fileUrl });
    await newDocument.save();
    res.status(201).json(newDocument);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all documents for a specific case
exports.getDocumentsByCase = async (req, res) => {
  try {
    const { caseId } = req.params;
    const documents = await Document.find({ caseId });
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete document
exports.deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    await Document.findByIdAndDelete(id);
    res.status(200).json({ message: 'Document deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
