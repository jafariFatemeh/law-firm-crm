// backend/models/Document.js
// models/Document.js
const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  case: { type: mongoose.Schema.Types.ObjectId, ref: 'Case', required: true },
  filePath: { type: String }
});

module.exports = mongoose.model('Document', documentSchema);
