// backend/models/Document.js
const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  path: { type: String, required: true },
  classification: { type: String },
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Document', documentSchema);
