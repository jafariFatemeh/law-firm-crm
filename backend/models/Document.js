// backend/models/Document.js
const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  url: { type: String, required: true },
  case: { type: mongoose.Schema.Types.ObjectId, ref: 'Case', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Document', documentSchema);
