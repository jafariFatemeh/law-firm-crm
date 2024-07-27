// backend/server.js
const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

const cors = require('cors');

app.use(cors());


// Import routes
const authRoutes = require('./routes/auth');
const caseRoutes = require('./routes/cases');
const clientRoutes = require('./routes/clients');
const communicationRoutes = require('./routes/communications');
const dashboardRoutes = require('./routes/dashboard');
const documentRoutes = require('./routes/documents');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/cases', caseRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/communications', communicationRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/documents', documentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
