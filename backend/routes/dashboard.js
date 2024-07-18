const express = require('express');
const router = express.Router();

// Mock data for demonstration purposes
router.get('/', (req, res) => {
  res.json({
    clients: 10,
    cases: 5,
    documents: 15,
    communications: 20
  });
});

module.exports = router;
