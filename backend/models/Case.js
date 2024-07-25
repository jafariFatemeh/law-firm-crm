// backend/models/Case.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const caseSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Open', 'Closed', 'Pending'],
    default: 'Open'
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  documents: [{
    type: Schema.Types.ObjectId,
    ref: 'Document'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Case', caseSchema);
