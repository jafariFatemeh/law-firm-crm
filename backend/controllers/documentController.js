// backend/controllers/documentController.js
// controllers/documentsController.js
const Document = require('../models/Document');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage }).single('file');

const getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.find().populate('case');
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createDocument = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    const { title, description, case: caseId } = req.body;
    const filePath = req.file ? req.file.path : null;
    const document = new Document({ title, description, case: caseId, filePath });
    try {
      const newDocument = await document.save();
      res.status(201).json(newDocument);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
};

const updateDocument = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    const { title, description, case: caseId } = req.body;
    const filePath = req.file ? req.file.path : req.body.filePath;
    try {
      const updatedDocument = await Document.findByIdAndUpdate(
        req.params.id,
        { title, description, case: caseId, filePath },
        { new: true }
      ).populate('case');
      if (!updatedDocument) {
        return res.status(404).json({ message: 'Document not found' });
      }
      res.json(updatedDocument);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
};

const deleteDocument = async (req, res) => {
  try {
    const deletedDocument = await Document.findByIdAndDelete(req.params.id);
    if (!deletedDocument) {
      return res.status(404).json({ message: 'Document not found' });
    }
    res.json({ message: 'Document deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllDocuments,
  createDocument,
  updateDocument,
  deleteDocument
};
