// backend/controllers/clientController.js
const Client = require('../models/Client');

// Create new client
exports.createClient = async (req, res) => {
  try {
    const { name, contactInfo, address, email, phone } = req.body;
    if (!name || !contactInfo || !email) {
      return res.status(400).json({ message: 'Name, contact info, and email are required' });
    }
    const newClient = new Client({ name, contactInfo, address, email, phone });
    await newClient.save();
    res.status(201).json(newClient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all clients
exports.getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update client
exports.updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, contactInfo, address, email, phone } = req.body;
    if (!name || !contactInfo || !email) {
      return res.status(400).json({ message: 'Name, contact info, and email are required' });
    }
    const updatedClient = await Client.findByIdAndUpdate(id, { name, contactInfo, address, email, phone }, { new: true });
    res.status(200).json(updatedClient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete client
exports.deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    await Client.findByIdAndDelete(id);
    res.status(200).json({ message: 'Client deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

