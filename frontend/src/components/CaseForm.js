// src/components/CaseForm.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';
import './CaseForm.css';

const CaseForm = ({ case: initialCase, onSave, onClose }) => {
  const [title, setTitle] = useState(initialCase ? initialCase.title : '');
  const [description, setDescription] = useState(initialCase ? initialCase.description : '');
  const [client, setClient] = useState(initialCase ? initialCase.client : '');
  const [status, setStatus] = useState(initialCase ? initialCase.status : '');

  useEffect(() => {
    if (initialCase) {
      setTitle(initialCase.title);
      setDescription(initialCase.description);
      setClient(initialCase.client);
      setStatus(initialCase.status);
    }
  }, [initialCase]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const caseData = { title, description, client, status };
    onSave(caseData);
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>{initialCase ? 'Edit Case' : 'Add New Case'}</DialogTitle>
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
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Client"
                value={client}
                onChange={(e) => setClient(e.target.value)}
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
              />
            </Grid>
          </Grid>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" color="primary">
              {initialCase ? 'Save Changes' : 'Add Case'}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CaseForm;
