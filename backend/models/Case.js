// backend/models/Case.js
const mongoose = require('mongoose');
const caseSchema = new mongoose.Schema({
  caseName: { type: String, required: true },
  caseDescription: { type: String, required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
});
module.exports = mongoose.model('Case', caseSchema);
