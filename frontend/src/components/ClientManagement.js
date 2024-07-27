// src/pages/ClientManagement.js
import React, { useState, useEffect } from 'react';
import axios from '../services/axiosConfig';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import './ClientManagement.css';

const ClientManagement = () => {
  const [clients, setClients] = useState([]); // Initialize as an array
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', contactInfo: '', address: '', email: '', phone: '' });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get('/clients');
      // Ensure response data is an array
      if (Array.isArray(response.data)) {
        setClients(response.data);
      } else {
        console.error("Fetched clients data is not an array: ", response.data);
        setClients([]);
      }
    } catch (error) {
      console.error("Error fetching clients: ", error);
      setClients([]); // Set an empty array on error
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      await axios.post('/clients', formData);
      fetchClients();
      handleClose();
    } catch (error) {
      console.error("Error adding client: ", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/clients/${id}`);
      fetchClients();
    } catch (error) {
      console.error("Error deleting client: ", error);
    }
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'contactInfo', headerName: 'Contact Info', width: 150 },
    { field: 'address', headerName: 'Address', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'phone', headerName: 'Phone', width: 150 },
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
    <div className="client-management">
      <h2>Client Management</h2>
      <Button variant="contained" color="primary" onClick={handleOpen}>Add New Client</Button>
      <DataGrid 
        rows={clients} 
        columns={columns} 
        pageSize={5} 
        autoHeight 
        getRowId={(row) => row._id} // Ensure each row has a unique id
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Client</DialogTitle>
        <DialogContent>
          <TextField name="name" label="Name" fullWidth margin="dense" onChange={handleChange} />
          <TextField name="contactInfo" label="Contact Info" fullWidth margin="dense" onChange={handleChange} />
          <TextField name="address" label="Address" fullWidth margin="dense" onChange={handleChange} />
          <TextField name="email" label="Email" fullWidth margin="dense" onChange={handleChange} />
          <TextField name="phone" label="Phone" fullWidth margin="dense" onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ClientManagement;
