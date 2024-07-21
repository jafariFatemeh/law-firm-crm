// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const clientRoutes = require('./routes/clients');
const caseRoutes = require('./routes/cases');
const documentRoutes = require('./routes/documents');
const communicationRoutes = require('./routes/communications');
const dashboardRoutes = require('./routes/dashboard');
const { createServer } = require('http');
const { Server } = require('socket.io');
const helmet = require('helmet');

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Configure helmet with a strict CSP policy
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'", "wss://backend-0vwz.onrender.com"],
      // Add other directives as needed
    },
  },
}));
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/cases', caseRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/communications', communicationRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.get('/health-check', (req, res) => {
  res.send({ message: 'Backend is running' });
});

io.on('connection', (socket) => {
  console.log('a user connected');

  const sendNewData = () => {
    const newData = {
      clients: Math.floor(Math.random() * 100),
      cases: Math.floor(Math.random() * 100),
      documents: Math.floor(Math.random() * 100),
      communications: Math.floor(Math.random() * 100),
    };
    socket.emit('updateData', newData);
  };

  const intervalId = setInterval(sendNewData, 5000);

  socket.on('disconnect', () => {
    console.log('a user disconnected');
    clearInterval(intervalId); // Clear the interval on disconnect
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
