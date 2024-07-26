// backend/controllers/documentController.js
const multer = require('multer');
const Document = require('../models/Document');
const Case = require('../models/Case');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage }).single('file');

exports.uploadDocument = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    try {
      const { title, caseId } = req.body;
      if (!title || !caseId || !req.file) {
        return res.status(400).json({ error: 'Title, caseId, and file are required.' });
      }
      const newDocument = new Document({
        title,
        filePath: req.file.path,
        case: caseId
      });
      const savedDocument = await newDocument.save();
      await Case.findByIdAndUpdate(caseId, { $push: { documents: savedDocument._id } });
      res.status(201).json(savedDocument);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
};

exports.getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.find().populate('case');
    res.status(200).json(documents);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteDocument = async (req, res) => {
  try {
    const deletedDocument = await Document.findByIdAndDelete(req.params.id);
    if (!deletedDocument) return res.status(404).json({ error: 'Document not found' });
    await Case.findByIdAndUpdate(deletedDocument.case, { $pull: { documents: deletedDocument._id } });
    res.status(200).json({ message: 'Document deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
