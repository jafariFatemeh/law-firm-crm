// backend/controllers/clientController.js
const Client = require('../models/Client');

const getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching clients' });
  }
};

const addClient = async (req, res) => {
  const { name, contactInfo } = req.body;
  const client = new Client({ name, contactInfo });

  try {
    const savedClient = await client.save();
    res.status(201).json(savedClient);
  } catch (err) {
    res.status(500).json({ message: 'Error adding client' });
  }
};

const updateClient = async (req, res) => {
  const { id } = req.params;
  const { name, contactInfo } = req.body;

  try {
    const updatedClient = await Client.findByIdAndUpdate(id, { name, contactInfo }, { new: true });
    res.json(updatedClient);
  } catch (err) {
    res.status(500).json({ message: 'Error updating client' });
  }
};

const deleteClient = async (req, res) => {
  const { id } = req.params;

  try {
    await Client.findByIdAndDelete(id);
    res.json({ message: 'Client deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting client' });
  }
};

module.exports = {
  getClients,
  addClient,
  updateClient,
  deleteClient,
};

