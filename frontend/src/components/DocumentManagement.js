// src/pages/DocumentManagement.js
import React, { useState, useEffect } from 'react';
import axios from '../services/axiosConfig';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const DocumentManagement = () => {
  const [documents, setDocuments] = useState([]);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    const response = await axios.get('api/documents');
    setDocuments(response.data);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('file', file);
    await axios.post('api/documents/upload', formData);
    fetchDocuments();
    handleClose();
  };

  const handleDelete = async (id) => {
    await axios.delete(`api/documents/${id}`);
    fetchDocuments();
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'uploadedAt', headerName: 'Uploaded At', width: 250 },
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
    <div>
      <h2>Document Management</h2>
      <Button variant="contained" color="primary" onClick={handleOpen}>Upload New Document</Button>
      <DataGrid rows={documents} columns={columns} pageSize={5} autoHeight />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Upload New Document</DialogTitle>
        <DialogContent>
          <input type="file" onChange={handleFileChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">Upload</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DocumentManagement;

