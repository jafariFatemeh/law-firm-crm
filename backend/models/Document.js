// backend/models/Document.js
const mongoose = require('mongoose');
const documentSchema = new mongoose.Schema({
  documentName: { type: String, required: true },
  caseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Case', required: true },
  filePath: { type: String, required: true },
});
module.exports = mongoose.model('Document', documentSchema);
