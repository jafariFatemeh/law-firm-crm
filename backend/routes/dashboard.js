const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // Dummy data for dashboard
  const data = {
    clients: 50,
    cases: 75,
    documents: 150,
    communications: 200
  };
  res.send(data);
});

module.exports = router;
