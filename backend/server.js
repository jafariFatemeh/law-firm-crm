// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const clientRoutes = require('./routes/clients');
const caseRoutes = require('./routes/cases');
const documentRoutes = require('./routes/documents');
const communicationRoutes = require('./routes/communications');

app.use('/api/clients', clientRoutes);
app.use('/api/cases', caseRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/communications', communicationRoutes);

const PORT = process.env.PORT || 5000;

// Health check endpoint
app.get('/health-check', (req, res) => {
  res.status(200).json({ message: 'Backend is up and running!' });
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      //useNewUrlParser: true,
      // useUnifiedTopology: true, // Remove this line
      //useCreateIndex: true,
      //useFindAndModify: false
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
};

connectDB();
