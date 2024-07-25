// backend/controllers/documentController.js
const Document = require('../models/Document');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

exports.getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.find();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.uploadDocument = [
  upload.single('file'),
  async (req, res) => {
    const { file } = req;
    const newDocument = new Document({
      name: file.originalname,
      path: file.path,
      classification: 'Unclassified', // Placeholder, you can integrate AI classification here
    });
    try {
      const savedDocument = await newDocument.save();
      res.status(201).json(savedDocument);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
];

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
    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
