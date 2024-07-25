// backend/models/Case.js
const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  status: { type: String, enum: ['Open', 'Closed'], default: 'Open' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Case', caseSchema);
