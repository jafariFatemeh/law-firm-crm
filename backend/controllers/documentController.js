// backend/controllers/documentController.js
const Document = require('../models/Document');

exports.getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.find();
    res.json(documents);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.addDocument = async (req, res) => {
  const { title, content, client } = req.body;

  try {
    const newDocument = new Document({
      title,
      content,
      client
    });

    const document = await newDocument.save();

    res.json(document);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
