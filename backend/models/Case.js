// backend/models/Case.js
const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  status: { type: String, enum: ['Open', 'Closed', 'In Progress'], default: 'Open' },
}, { timestamps: true });

module.exports = mongoose.model('Case', caseSchema);


