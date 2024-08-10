// backend/routes/documents.js
const express = require('express');
const multer = require('multer');
const { analyzeContract } = require('../controllers/documentController');
const router = express.Router();

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Endpoint for uploading and analyzing contract
router.post('/upload', upload.single('document'), analyzeContract);

module.exports = router;
