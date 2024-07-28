// src/components/DocumentForm.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem } from '@mui/material';
import axios from '../services/axiosConfig';

const DocumentForm = ({ caseId, onSave, onClose }) => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('caseId', caseId);
    formData.append('file', file);

    onSave(formData);
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Add New Document</DialogTitle>
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
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
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

export default DocumentForm;
