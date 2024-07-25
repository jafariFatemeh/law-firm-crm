// backend/controllers/documentController.js
const Document = require('../models/Document');
const Case = require('../models/Case');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage }).single('file');

exports.addDocument = (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(400).json({ error: err.message });

    const newDocument = new Document({
      title: req.body.title,
      description: req.body.description,
      fileUrl: req.file.path,
      case: req.body.case
    });

    try {
      const savedDocument = await newDocument.save();
      await Case.findByIdAndUpdate(savedDocument.case, { $push: { documents: savedDocument._id } });
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

exports.getDocumentById = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id).populate('case');
    if (!document) return res.status(404).json({ error: 'Document not found' });
    res.status(200).json(document);
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
