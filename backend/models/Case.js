// backend/models/Case.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const caseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Case', caseSchema);
