const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // Example data, replace with actual data fetching logic
  const data = {
    clients: [12, 19, 3, 5, 2, 3],  // Replace with actual data
    cases: [2, 3, 20, 5, 1, 4],    // Replace with actual data
    documents: [5, 8, 2, 6, 9, 10], // Replace with actual data
    communications: [7, 2, 1, 9, 8, 6] // Replace with actual data
  };
  res.send(data);
});

module.exports = router;
