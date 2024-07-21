// routes/dashboard.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // Example data, replace with actual data fetching logic
  const data = {
    clients: [12, 19, 3, 5, 2, 3],
    cases: [2, 3, 20, 5, 1, 4],
    documents: [5, 8, 2, 6, 9, 10],
    communications: [7, 2, 1, 9, 8, 6]
  };
  res.send(data);
});

module.exports = router;

