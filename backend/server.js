// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

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

const clientRoutes = require('./routes/clients');
const caseRoutes = require('./routes/cases');
const documentRoutes = require('./routes/documents');
const communicationRoutes = require('./routes/communications');
const authRoutes = require('./routes/auth');

app.use('/api/clients', clientRoutes);
app.use('/api/cases', caseRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/communications', communicationRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/auth/login', authRoutes);
app.use('/api/auth/register', authRoutes);

// Health check endpoint
app.get('/api/health-check', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



connectDB();
