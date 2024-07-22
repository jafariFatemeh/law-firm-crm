// backend/controllers/clientController.js
const Client = require('../models/Client');

exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.addClient = async (req, res) => {
  const { name, email, phone, address } = req.body;

  try {
    const newClient = new Client({
      name,
      email,
      phone,
      address
    });

    const client = await newClient.save();

    res.json(client);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

