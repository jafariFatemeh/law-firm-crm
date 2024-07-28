// src/components/DocumentForm.js
// src/components/DocumentForm.js
import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from '@mui/material';
import axios from '../services/axiosConfig';

const DocumentForm = ({ document, onSave, onClose }) => {
  const [title, setTitle] = useState(document?.title || '');
  const [description, setDescription] = useState(document?.description || '');
  const [caseId, setCaseId] = useState(document?.case?._id || '');
  const [file, setFile] = useState(null);
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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('case', caseId);
    if (file) {
      formData.append('file', file);
    }
    onSave(formData);
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{document ? 'Edit Document' : 'Add Document'}</DialogTitle>
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
            label="Description"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
          <input type="file" onChange={handleFileChange} />
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

export default DocumentForm;
