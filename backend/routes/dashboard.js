const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // Example data, replace with actual data fetching logic
  const data = {
    clients: 20,
    cases: 30,
    documents: 40,
    communications: 50,
  };
  res.send(data);
});

module.exports = router;
