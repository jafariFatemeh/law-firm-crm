// src/pages/CaseManagement.js
import React, { useState, useEffect } from 'react';
import axios from '../services/axiosConfig';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import CaseForm from './CaseForm';

const CaseManagement = () => {
  const [cases, setCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    const result = await axios.get('/api/cases');
    setCases(result.data);
  };

  const saveCase = async (caseData) => {
    try {
      if (selectedCase) {
        const response = await axios.put(`/api/cases/${selectedCase._id}`, caseData);
        setCases(cases.map(c => (c._id === selectedCase._id ? response.data : c)));
      } else {
        const response = await axios.post('/api/cases', caseData);
        setCases([...cases, response.data]);
      }
      setFormOpen(false);
      setSelectedCase(null);
    } catch (error) {
      console.error('Error saving case:', error);
      alert(`Error: ${error.response?.data?.message || 'Could not save case'}`);
    }
  };

  const deleteCase = async (id) => {
    try {
      await axios.delete(`/api/cases/${id}`);
      setCases(cases.filter(caseItem => caseItem._id !== id));
    } catch (error) {
      console.error('Error deleting case:', error);
      alert(`Error: ${error.response?.data?.message || 'Could not delete case'}`);
    }
  };

  const handleAddClick = () => {
    setSelectedCase(null);
    setFormOpen(true);
  };

  const handleEditClick = (caseItem) => {
    setSelectedCase(caseItem);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setSelectedCase(null);
  };

  return (
    <div>
      <h2>Case Management</h2>
      <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleAddClick}>
        Add New Case
      </Button>
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cases.map((caseItem) => (
              <TableRow key={caseItem._id}>
                <TableCell>{caseItem.title}</TableCell>
                <TableCell>{caseItem.description}</TableCell>
                <TableCell>{caseItem.status}</TableCell>
                <TableCell>{caseItem.assignedTo.name}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditClick(caseItem)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => deleteCase(caseItem._id)} color="secondary">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {formOpen && <CaseForm caseItem={selectedCase} onSave={saveCase} onClose={handleCloseForm} />}
    </div>
  );
};

export default CaseManagement;
