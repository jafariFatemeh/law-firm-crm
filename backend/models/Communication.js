const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const communicationSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  case: {
    type: Schema.Types.ObjectId,
    ref: 'Case',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Communication = mongoose.model('Communication', communicationSchema);
module.exports = Communication;
