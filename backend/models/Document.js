// backend/models/Document.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  url: { type: String, required: true },
  case: { type: Schema.Types.ObjectId, ref: 'Case', required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Document', documentSchema);
