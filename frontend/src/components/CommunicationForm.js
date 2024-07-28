// src/components/CommunicationForm.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem } from '@mui/material';

const CommunicationForm = ({ caseId, onSave, onClose }) => {
  const [type, setType] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ caseId, type, content });
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Add New Communication</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Select
                value={type}
                onChange={(e) => setType(e.target.value)}
                fullWidth
                required
              >
                <MenuItem value="Email">Email</MenuItem>
                <MenuItem value="Phone">Phone</MenuItem>
                <MenuItem value="Meeting">Meeting</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                fullWidth
                multiline
                rows={4}
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

export default CommunicationForm;
