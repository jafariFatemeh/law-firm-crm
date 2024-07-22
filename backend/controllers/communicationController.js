// backend/controllers/communicationController.js
const Communication = require('../models/Communication');

exports.getAllCommunications = async (req, res) => {
  try {
    const communications = await Communication.find();
    res.json(communications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.addCommunication = async (req, res) => {
  const { type, content, client, date } = req.body;

  try {
    const newCommunication = new Communication({
      type,
      content,
      client,
      date
    });

    const communication = await newCommunication.save();

    res.json(communication);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
