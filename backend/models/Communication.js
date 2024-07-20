// backend/models/Communication.js
const mongoose = require('mongoose');
const communicationSchema = new mongoose.Schema({
  message: { type: String, required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  date: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Communication', communicationSchema);
