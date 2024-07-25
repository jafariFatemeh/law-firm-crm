// src/pages/DocumentManagement.js
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from '../services/axiosConfig';
import './DocumentManagement.css';

const DocumentManagement = () => {
  const [documents, setDocuments] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentDocument, setCurrentDocument] = useState({ name: '', path: '', classification: '' });
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get('/documents');
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const handleOpen = (documentData) => {
    setCurrentDocument(documentData);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentDocument({ name: '', path: '', classification: '' });
    setFile(null);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', currentDocument.name);
    formData.append('classification', currentDocument.classification);

    try {
      if (currentDocument._id) {
        await axios.put(`/documents/${currentDocument._id}`, currentDocument);
      } else {
        await axios.post('/documents', formData);
      }
      fetchDocuments();
      handleClose();
    } catch (error) {
      console.error('Error saving document:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/documents/${id}`);
      fetchDocuments();
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  return (
    <div className="document-management">
      <h1>Document Management</h1>
      <Button variant="contained" color="primary" onClick={() => handleOpen({})}>Upload New Document</Button>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={documents}
          columns={[
            { field: 'name', headerName: 'Name', width: 200 },
            { field: 'classification', headerName: 'Classification', width: 200 },
            { field: 'uploadedAt', headerName: 'Uploaded At', width: 200 },
            {
              field: 'actions',
              headerName: 'Actions',
              width: 150,
              renderCell: (params) => (
                <div>
                  <Button onClick={() => handleOpen(params.row)}>Edit</Button>
                  <Button onClick={() => handleDelete(params.row._id)}>Delete</Button>
                </div>
              )
            }
          ]}
          pageSize={5}
        />
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentDocument._id ? 'Edit Document' : 'Upload New Document'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            value={currentDocument.name}
            onChange={(e) => setCurrentDocument({ ...currentDocument, name: e.target.value })}
          />
          <TextField
            label="Classification"
            fullWidth
            value={currentDocument.classification}
            onChange={(e) => setCurrentDocument({ ...currentDocument, classification: e.target.value })}
          />
          {!currentDocument._id && (
            <input
              type="file"
              onChange={handleFileChange}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DocumentManagement;

