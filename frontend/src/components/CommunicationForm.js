// src/components/CommunicationForm.js
// src/components/CommunicationForm.js
import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from '@mui/material';
import axios from '../services/axiosConfig';

const CommunicationForm = ({ communication, onSave, onClose }) => {
  const [title, setTitle] = useState(communication?.title || '');
  const [content, setContent] = useState(communication?.content || '');
  const [caseId, setCaseId] = useState(communication?.case?._id || '');
  const [cases, setCases] = useState([]);

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      const result = await axios.get('/api/cases');
      setCases(result.data);
    } catch (error) {
      console.error('Error fetching cases:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const communicationData = { title, content, case: caseId };
    if (!title || !content || !caseId) {
      alert("All fields are required");
      return;
    }
    onSave(communicationData);
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{communication ? 'Edit Communication' : 'Add Communication'}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="dense"
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="Content"
            fullWidth
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <TextField
            select
            margin="dense"
            label="Case"
            fullWidth
            value={caseId}
            onChange={(e) => setCaseId(e.target.value)}
            required
          >
            {cases.map((caseItem) => (
              <MenuItem key={caseItem._id} value={caseItem._id}>
                {caseItem.title}
              </MenuItem>
            ))}
          </TextField>
          <DialogActions>
            <Button onClick={onClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CommunicationForm;
