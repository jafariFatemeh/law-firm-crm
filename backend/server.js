// backend/server.js
const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

connectDB();

app.use(express.json({ extended: false }));

const cors = require('cors');

app.use(cors());


// Define routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/cases', require('./routes/cases'));
app.use('/api/clients', require('./routes/clients'));
app.use('/api/communications', require('./routes/communications'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/documents', require('./routes/documents'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
