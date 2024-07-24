// backend/controllers/clientController.js
const Client = require('../models/Client');

exports.getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createClient = async (req, res) => {
  try {
    const { name, contactInfo, address, email, phone } = req.body;

    if (!name || !contactInfo || !email) {
      return res.status(400).json({ message: 'Name, contact info, and email are required' });
    }

    const newClient = new Client({
      name,
      contactInfo,
      address,
      email,
      phone,
    });

    await newClient.save();
    res.status(201).json(newClient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    client.name = req.body.name || client.name;
    client.contactInfo = req.body.contactInfo || client.contactInfo;

    const updatedClient = await client.save();
    res.status(200).json(updatedClient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    await client.remove();
    res.status(200).json({ message: 'Client deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

