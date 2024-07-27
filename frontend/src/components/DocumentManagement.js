// src/pages/DocumentManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import DocumentForm from './DocumentForm';

const DocumentManagement = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const result = await axios.get('/api/documents');
      console.log(result.data); // Log the data to check its structure
      if (Array.isArray(result.data)) {
        setDocuments(result.data);
      } else {
        console.error('Data is not an array:', result.data);
        // Handle unexpected data
        setDocuments([]);
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
      alert('Failed to fetch documents. Please try again later.');
    }
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
      alert('Error saving document.');
    }
  };

  const deleteDocument = async (id) => {
    try {
      await axios.delete(`/api/documents/${id}`);
      setDocuments(documents.filter(d => d._id !== id));
    } catch (error) {
      console.error('Error deleting document:', error);
      alert('Error deleting document.');
    }
  };

  const handleAddClick = () => {
    setSelectedDocument(null);
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
              <TableCell>Title</TableCell>
              <TableCell>File</TableCell>
              <TableCell>Case</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents.map((document) => (
              <TableRow key={document._id}>
                <TableCell>{document.title}</TableCell>
                <TableCell>
                  <a href={document.fileUrl} target="_blank" rel="noopener noreferrer">View</a>
                </TableCell>
                <TableCell>{document.case?.title || 'N/A'}</TableCell>
                <TableCell>
                  <IconButton color="secondary" onClick={() => deleteDocument(document._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {formOpen && <DocumentForm document={selectedDocument} onSave={saveDocument} onClose={handleCloseForm} />}
    </div>
  );
};

export default DocumentManagement;
