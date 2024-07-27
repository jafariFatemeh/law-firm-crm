// backend/controllers/documentController.js
const Document = require('../models/Document');

// Get all documents
exports.getDocuments = async (req, res) => {
  try {
    const documents = await Document.find().populate('case');
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching documents', error });
  }
};

// Get a single document by ID
exports.getDocumentById = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id).populate('case');
    if (!document) return res.status(404).json({ message: 'Document not found' });
    res.json(document);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching document', error });
  }
};

// Create a new document
exports.createDocument = async (req, res) => {
  try {
    const newDocument = new Document(req.body);
    await newDocument.save();
    res.status(201).json(newDocument);
  } catch (error) {
    res.status(500).json({ message: 'Error creating document', error });
  }
};

// Update a document
exports.updateDocument = async (req, res) => {
  try {
    const updatedDocument = await Document.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDocument) return res.status(404).json({ message: 'Document not found' });
    res.json(updatedDocument);
  } catch (error) {
    res.status(500).json({ message: 'Error updating document', error });
  }
};

// Delete a document
exports.deleteDocument = async (req, res) => {
  try {
    const deletedDocument = await Document.findByIdAndDelete(req.params.id);
    if (!deletedDocument) return res.status(404).json({ message: 'Document not found' });
    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting document', error });
  }
};
