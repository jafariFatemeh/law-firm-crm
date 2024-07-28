// src/components/CaseForm.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem } from '@mui/material';
import axios from '../services/axiosConfig';

const CaseForm = ({ caseItem, onSave, onClose }) => {
  const [title, setTitle] = useState(caseItem ? caseItem.title : '');
  const [description, setDescription] = useState(caseItem ? caseItem.description : '');
  const [status, setStatus] = useState(caseItem ? caseItem.status : '');
  const [assignedTo, setAssignedTo] = useState(caseItem ? caseItem.assignedTo._id : '');
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      const result = await axios.get('/api/clients');
      setClients(result.data);
    };

    fetchClients();
  }, []);

  useEffect(() => {
    if (caseItem) {
      setTitle(caseItem.title);
      setDescription(caseItem.description);
      setStatus(caseItem.status);
      setAssignedTo(caseItem.assignedTo._id);
    }
  }, [caseItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const caseData = { title, description, status, assignedTo };
    onSave(caseData);
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>{caseItem ? 'Edit Case' : 'Add New Case'}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                label="Assigned To"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                fullWidth
                required
              >
                {clients.map((client) => (
                  <MenuItem key={client._id} value={client._id}>
                    {client.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <DialogActions>
            <Button onClick={onClose} color="secondary">Cancel</Button>
            <Button type="submit" color="primary">Save</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CaseForm;
