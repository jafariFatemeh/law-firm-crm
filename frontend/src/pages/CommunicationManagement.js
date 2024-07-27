// src/pages/CommunicationTools.js
// src/pages/CommunicationManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import CommunicationForm from '../components/CommunicationForm';
import './CommunicationManagement.css';

const CommunicationManagement = () => {
  const [communications, setCommunications] = useState([]);
  const [selectedCommunication, setSelectedCommunication] = useState(null);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    fetchCommunications();
  }, []);

  const fetchCommunications = async () => {
    const result = await axios.get('/api/communications');
    setCommunications(result.data);
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
      alert(`Error: ${error.response?.data?.message || 'Could not save communication'}`);
    }
  };

  const deleteCommunication = async (id) => {
    try {
      await axios.delete(`/api/communications/${id}`);
      setCommunications(communications.filter(comm => comm._id !== id));
    } catch (error) {
      console.error('Error deleting communication:', error);
      alert(`Error: ${error.response?.data?.message || 'Could not delete communication'}`);
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
              <TableCell>Type</TableCell>
              <TableCell>Content</TableCell>
              <TableCell>Case</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {communications.map((communication) => (
              <TableRow key={communication._id}>
                <TableCell>{communication.type}</TableCell>
                <TableCell>{communication.content}</TableCell>
                <TableCell>{communication.case.title}</TableCell>
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
      {formOpen && <CommunicationForm communicationData={selectedCommunication} onSave={saveCommunication} onClose={handleCloseForm} />}
    </div>
  );
};

export default CommunicationManagement;

