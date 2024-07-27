// backend/models/Document.js
const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  fileUrl: { type: String, required: true },
  case: { type: mongoose.Schema.Types.ObjectId, ref: 'Case' },
  // Additional fields as necessary
}, { timestamps: true });

module.exports = mongoose.model('Document', documentSchema);
