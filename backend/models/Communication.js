// backend/models/Communication.js
const mongoose = require('mongoose');

const communicationSchema = new mongoose.Schema({
  type: { type: String, required: true },
  content: { type: String, required: true },
  case: { type: mongoose.Schema.Types.ObjectId, ref: 'Case', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Communication', communicationSchema);
