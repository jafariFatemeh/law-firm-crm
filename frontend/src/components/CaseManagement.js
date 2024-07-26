// src/pages/CaseManagement.js
import React, { useState, useEffect } from 'react';
import axios from '../services/axiosConfig';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import './CaseManagement.css';

const CaseManagement = () => {
  const [cases, setCases] = useState([]);
  const [clients, setClients] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', status: '', client: '' });

  useEffect(() => {
    fetchCases();
    fetchClients();
  }, []);

  const fetchCases = async () => {
    const response = await axios.get('/api/cases');
    setCases(response.data);
  };

  const fetchClients = async () => {
    const response = await axios.get('/api/clients');
    setClients(response.data);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    await axios.post('/api/cases', formData);
    fetchCases();
    handleClose();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/cases/${id}`);
    fetchCases();
  };

  const columns = [
    { field: 'title', headerName: 'Title', width: 150 },
    { field: 'description', headerName: 'Description', width: 250 },
    { field: 'status', headerName: 'Status', width: 150 },
    {
      field: 'client',
      headerName: 'Client',
      width: 150,
      valueGetter: (params) => params.row.client ? params.row.client.name : 'N/A'
    },
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
    <div className="case-management">
      <h2>Case Management</h2>
      <Button variant="contained" color="primary" onClick={handleOpen}>Add New Case</Button>
      <DataGrid 
        rows={cases} 
        columns={columns} 
        pageSize={5} 
        autoHeight 
        getRowId={(row) => row._id} 
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Case</DialogTitle>
        <DialogContent>
          <TextField name="title" label="Title" fullWidth margin="dense" onChange={handleChange} />
          <TextField name="description" label="Description" fullWidth margin="dense" onChange={handleChange} />
          <FormControl fullWidth margin="dense">
            <InputLabel>Status</InputLabel>
            <Select name="status" value={formData.status} onChange={handleChange}>
              <MenuItem value="Open">Open</MenuItem>
              <MenuItem value="Closed">Closed</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Client</InputLabel>
            <Select name="client" value={formData.client} onChange={handleChange}>
              {clients.map(client => (
                <MenuItem key={client._id} value={client._id}>{client.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
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
