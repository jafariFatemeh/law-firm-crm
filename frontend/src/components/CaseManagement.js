// src/pages/CaseManagement.js
import React, { useState, useEffect } from 'react';
import axios from '../services/axiosConfig';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const CaseManagement = () => {
  const [cases, setCases] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', status: '', client: '' });

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    const response = await axios.get('/cases');
    setCases(response.data);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    await axios.post('/cases', formData);
    fetchCases();
    handleClose();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/cases/${id}`);
    fetchCases();
  };

  const columns = [
    { field: 'title', headerName: 'Title', width: 150 },
    { field: 'description', headerName: 'Description', width: 250 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'client', headerName: 'Client', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button onClick={() => handleDelete(params.id)} color="secondary" variant="contained">Delete</Button>
      )
    }
  ];

  return (
    <div>
      <h2>Case Management</h2>
      <Button variant="contained" color="primary" onClick={handleOpen}>Add New Case</Button>
      <DataGrid rows={cases} columns={columns} pageSize={5} autoHeight />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Case</DialogTitle>
        <DialogContent>
          <TextField name="title" label="Title" fullWidth margin="dense" onChange={handleChange} />
          <TextField name="description" label="Description" fullWidth margin="dense" onChange={handleChange} />
          <TextField name="status" label="Status" fullWidth margin="dense" onChange={handleChange} />
          <TextField name="client" label="Client" fullWidth margin="dense" onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CaseManagement;

