const express = require('express');
const multer = require('multer');
const { analyzeLegalDocument } = require('../controllers/legalResearchController');
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

// Endpoint for uploading and analyzing legal documents
router.post('/upload', upload.single('document'), analyzeLegalDocument);

module.exports = router;
