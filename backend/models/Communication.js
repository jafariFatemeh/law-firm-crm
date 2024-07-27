// backend/models/Communication.js
const mongoose = require('mongoose');

const communicationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  // Additional fields as necessary
}, { timestamps: true });

module.exports = mongoose.model('Communication', communicationSchema);
