// backend/models/Client.js
const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contactInfo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Client', clientSchema);
