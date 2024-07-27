// src/pages/CommunicationTools.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import CommunicationForm from './CommunicationForm';

const CommunicationManagement = () => {
  const [communications, setCommunications] = useState([]);
  const [selectedCommunication, setSelectedCommunication] = useState(null);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    fetchCommunications();
  }, []);

  const fetchCommunications = async () => {
    try {
      const result = await axios.get('/api/communications');
      console.log(result.data); // Log the data to check its structure
      if (Array.isArray(result.data)) {
        setCommunications(result.data);
      } else {
        console.error('Data is not an array:', result.data);
        // Handle unexpected data
        setCommunications([]);
      }
    } catch (error) {
      console.error('Error fetching communications:', error);
      alert('Failed to fetch communications. Please try again later.');
    }
  };

  const saveCommunication = async (communicationData) => {
    try {
      if (selectedCommunication) {
        const response = await axios.put(`/api/communications/${selectedCommunication._id}`, communicationData);
        setCommunications(communications.map(c => (c._id === selectedCommunication._id ? response.data : c)));
      } else {
        const response = await axios.post('/api/communications', communicationData);
        setCommunications([...communications, response.data]);
      }
      setFormOpen(false);
      setSelectedCommunication(null);
    } catch (error) {
      console.error('Error saving communication:', error);
      alert('Error saving communication.');
    }
  };

  const deleteCommunication = async (id) => {
    try {
      await axios.delete(`/api/communications/${id}`);
      setCommunications(communications.filter(c => c._id !== id));
    } catch (error) {
      console.error('Error deleting communication:', error);
      alert('Error deleting communication.');
    }
  };

  const handleAddClick = () => {
    setSelectedCommunication(null);
    setFormOpen(true);
  };

  const handleEditClick = (communication) => {
    setSelectedCommunication(communication);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setSelectedCommunication(null);
  };

  return (
    <div>
      <h2>Communication Management</h2>
      <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleAddClick}>
        Add New Communication
      </Button>
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {communications.map((communication) => (
              <TableRow key={communication._id}>
                <TableCell>{communication.title}</TableCell>
                <TableCell>{communication.description}</TableCell>
                <TableCell>{communication.client?.name || 'N/A'}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditClick(communication)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => deleteCommunication(communication._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {formOpen && <CommunicationForm communication={selectedCommunication} onSave={saveCommunication} onClose={handleCloseForm} />}
    </div>
  );
};

export default CommunicationManagement;
