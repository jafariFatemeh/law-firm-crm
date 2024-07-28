// src/pages/CommunicationTools.js
import React, { useState, useEffect } from 'react';
import axios from '../services/axiosConfig';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import CommunicationForm from './CommunicationForm';

const CommunicationManagement = ({ caseId }) => {
  const [communications, setCommunications] = useState([]);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    fetchCommunications();
  }, [caseId]);

  const fetchCommunications = async () => {
    const result = await axios.get(`/api/communications/case/${caseId}`);
    setCommunications(result.data);
  };

  const saveCommunication = async (data) => {
    try {
      const response = await axios.post('/api/communications', data);
      setCommunications([...communications, response.data]);
      setFormOpen(false);
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
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
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
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {communications.map((communication) => (
              <TableRow key={communication._id}>
                <TableCell>{communication.type}</TableCell>
                <TableCell>{communication.content}</TableCell>
                <TableCell>
                  <IconButton onClick={() => deleteCommunication(communication._id)} color="secondary">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {formOpen && <CommunicationForm caseId={caseId} onSave={saveCommunication} onClose={handleCloseForm} />}
    </div>
  );
};

export default CommunicationManagement;
