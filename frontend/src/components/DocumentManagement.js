// src/pages/DocumentManagement.js
// src/pages/DocumentManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import DocumentForm from '../components/DocumentForm';
import './DocumentManagement.css';

const DocumentManagement = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    const result = await axios.get('/api/documents');
    setDocuments(result.data);
  };

  const saveDocument = async (documentData) => {
    try {
      if (selectedDocument) {
        const response = await axios.put(`/api/documents/${selectedDocument._id}`, documentData);
        setDocuments(documents.map(d => (d._id === selectedDocument._id ? response.data : d)));
      } else {
        const response = await axios.post('/api/documents', documentData);
        setDocuments([...documents, response.data]);
      }
      setFormOpen(false);
      setSelectedDocument(null);
    } catch (error) {
      console.error('Error saving document:', error);
      alert(`Error: ${error.response?.data?.message || 'Could not save document'}`);
    }
  };

  const deleteDocument = async (id) => {
    try {
      await axios.delete(`/api/documents/${id}`);
      setDocuments(documents.filter(doc => doc._id !== id));
    } catch (error) {
      console.error('Error deleting document:', error);
      alert(`Error: ${error.response?.data?.message || 'Could not delete document'}`);
    }
  };

  const handleAddClick = () => {
    setSelectedDocument(null);
    setFormOpen(true);
  };

  const handleEditClick = (document) => {
    setSelectedDocument(document);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setSelectedDocument(null);
  };

  return (
    <div>
      <h2>Document Management</h2>
      <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleAddClick}>
        Add New Document
      </Button>
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Case</TableCell>
              <TableCell>URL</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents.map((document) => (
              <TableRow key={document._id}>
                <TableCell>{document.name}</TableCell>
                <TableCell>{document.type}</TableCell>
                <TableCell>{document.case.title}</TableCell>
                <TableCell>{document.url}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditClick(document)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => deleteDocument(document._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {formOpen && <DocumentForm documentData={selectedDocument} onSave={saveDocument} onClose={handleCloseForm} />}
    </div>
  );
};

export default DocumentManagement;
