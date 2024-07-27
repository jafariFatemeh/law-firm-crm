// src/components/CommunicationForm.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from '@mui/material';
import axios from 'axios';
import './CommunicationForm.css';

const CommunicationForm = ({ communicationData, onSave, onClose }) => {
  const [type, setType] = useState(communicationData ? communicationData.type : '');
  const [content, setContent] = useState(communicationData ? communicationData.content : '');
  const [caseId, setCaseId] = useState(communicationData ? communicationData.case : '');
  const [cases, setCases] = useState([]);

  useEffect(() => {
    if (communicationData) {
      setType(communicationData.type);
      setContent(communicationData.content);
      setCaseId(communicationData.case);
    }
    fetchCases();
  }, [communicationData]);

  const fetchCases = async () => {
    try {
      const response = await axios.get('/api/cases');
      setCases(response.data);
    } catch (error) {
      console.error('Error fetching cases:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCommunicationData = { type, content, case: caseId };
    onSave(newCommunicationData);
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>{communicationData ? 'Edit Communication' : 'Add New Communication'}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                label="Case"
                value={caseId}
                onChange={(e) => setCaseId(e.target.value)}
                fullWidth
                required
              >
                {cases.map((caseItem) => (
                  <MenuItem key={caseItem._id} value={caseItem._id}>
                    {caseItem.title}
                  </MenuItem>
                ))}
              </TextField>
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
