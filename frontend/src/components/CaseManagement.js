// src/pages/CaseManagement.js
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from '../services/axiosConfig';
import './CaseManagement.css';

const CaseManagement = () => {
  const [cases, setCases] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentCase, setCurrentCase] = useState({ title: '', description: '', client: '', status: '' });

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      const response = await axios.get('/cases');
      setCases(response.data);
    } catch (error) {
      console.error('Error fetching cases:', error);
    }
  };

  const handleOpen = (caseData) => {
    setCurrentCase(caseData);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentCase({ title: '', description: '', client: '', status: '' });
  };

  const handleSave = async () => {
    try {
      if (currentCase._id) {
        await axios.put(`/cases/${currentCase._id}`, currentCase);
      } else {
        await axios.post('/cases', currentCase);
      }
      fetchCases();
      handleClose();
    } catch (error) {
      console.error('Error saving case:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/cases/${id}`);
      fetchCases();
    } catch (error) {
      console.error('Error deleting case:', error);
    }
  };

  return (
    <div className="case-management">
      <h1>Case Management</h1>
      <Button variant="contained" color="primary" onClick={() => handleOpen({})}>Add New Case</Button>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={cases}
          columns={[
            { field: 'title', headerName: 'Title', width: 200 },
            { field: 'description', headerName: 'Description', width: 300 },
            { field: 'client', headerName: 'Client', width: 200 },
            { field: 'status', headerName: 'Status', width: 100 },
            {
              field: 'actions',
              headerName: 'Actions',
              width: 150,
              renderCell: (params) => (
                <div>
                  <Button onClick={() => handleOpen(params.row)}>Edit</Button>
                  <Button onClick={() => handleDelete(params.row._id)}>Delete</Button>
                </div>
              )
            }
          ]}
          pageSize={5}
        />
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentCase._id ? 'Edit Case' : 'Add New Case'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            value={currentCase.title}
            onChange={(e) => setCurrentCase({ ...currentCase, title: e.target.value })}
          />
          <TextField
            label="Description"
            fullWidth
            value={currentCase.description}
            onChange={(e) => setCurrentCase({ ...currentCase, description: e.target.value })}
          />
          <TextField
            label="Client"
            fullWidth
            value={currentCase.client}
            onChange={(e) => setCurrentCase({ ...currentCase, client: e.target.value })}
          />
          <TextField
            label="Status"
            fullWidth
            value={currentCase.status}
            onChange={(e) => setCurrentCase({ ...currentCase, status: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CaseManagement;

