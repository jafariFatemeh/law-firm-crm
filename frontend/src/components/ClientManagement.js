// src/pages/ClientManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import ClientForm from './ClientForm';

const ClientManagement = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const result = await axios.get('/api/clients');
    setClients(result.data);
  };

  const saveClient = async (client) => {
    try {
      if (selectedClient) {
        const response = await axios.put(`/api/clients/${selectedClient._id}`, client);
        setClients(clients.map(c => (c._id === selectedClient._id ? response.data : c)));
      } else {
        const response = await axios.post('/api/clients', client);
        setClients([...clients, response.data]);
      }
      setFormOpen(false);
      setSelectedClient(null);
    } catch (error) {
      console.error('Error saving client:', error);
      alert(`Error: ${error.response?.data?.message || 'Could not save client'}`);
    }
  };

  const deleteClient = async (id) => {
    try {
      await axios.delete(`/api/clients/${id}`);
      setClients(clients.filter(client => client._id !== id));
    } catch (error) {
      console.error('Error deleting client:', error);
      alert(`Error: ${error.response?.data?.message || 'Could not delete client'}`);
    }
  };

  const handleAddClick = () => {
    setSelectedClient(null);
    setFormOpen(true);
  };

  const handleEditClick = (client) => {
    setSelectedClient(client);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setSelectedClient(null);
  };

  return (
    <div>
      <h2>Client Management</h2>
      <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleAddClick}>
        Add New Client
      </Button>
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Contact Info</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client._id}>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.contactInfo}</TableCell>
                <TableCell>{client.address}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.phone}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditClick(client)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => deleteClient(client._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {formOpen && <ClientForm client={selectedClient} onSave={saveClient} onClose={handleCloseForm} />}
    </div>
  );
};

export default ClientManagement;
