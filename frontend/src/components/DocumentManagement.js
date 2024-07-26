// src/pages/DocumentManagement.js
import React, { useState, useEffect } from 'react';
import axios from '../services/axiosConfig';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import './DocumentManagement.css';

const DocumentManagement = () => {
  const [documents, setDocuments] = useState([]);
  const [cases, setCases] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', caseId: '' });
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchDocuments();
    fetchCases();
  }, []);

  const fetchDocuments = async () => {
    const response = await axios.get('/documents');
    setDocuments(response.data);
  };

  const fetchCases = async () => {
    const response = await axios.get('/cases');
    setCases(response.data);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async () => {
    if (!formData.title || !formData.caseId || !file) {
      alert('All fields are required.');
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append('title', formData.title);
    formDataObj.append('caseId', formData.caseId);
    formDataObj.append('file', file);

    try {
      await axios.post('/documents/upload', formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      fetchDocuments();
      handleClose();
    } catch (error) {
      console.error(error);
      alert('Error uploading document.');
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`/documents/${id}`);
    fetchDocuments();
  };

  const columns = [
    { field: 'title', headerName: 'Title', width: 150 },
    { field: 'case', headerName: 'Case', width: 150, valueGetter: (params) => params.row.case ? params.row.case.title : 'N/A' },
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
    <div className="document-management">
      <h2>Document Management</h2>
      <Button variant="contained" color="primary" onClick={handleOpen}>Upload Document</Button>
      <DataGrid 
        rows={documents} 
        columns={columns} 
        pageSize={5} 
        autoHeight 
        getRowId={(row) => row._id} 
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Upload Document</DialogTitle>
        <DialogContent>
          <TextField name="title" label="Title" fullWidth margin="dense" onChange={handleChange} />
          <FormControl fullWidth margin="dense">
            <InputLabel>Case</InputLabel>
            <Select name="caseId" value={formData.caseId} onChange={handleChange}>
              {cases.map(caseItem => (
                <MenuItem key={caseItem._id} value={caseItem._id}>{caseItem.title}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <input type="file" onChange={handleFileChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DocumentManagement;
