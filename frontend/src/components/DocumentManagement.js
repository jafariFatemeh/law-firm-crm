// src/pages/DocumentManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, CircularProgress } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import DocumentForm from './DocumentForm';

const DocumentManagement = () => {
  const [documents, setDocuments] = useState([]);
  const [cases, setCases] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDocuments();
    fetchCases();
  }, []);

  const fetchDocuments = async () => {
    setLoading(true);
    const result = await axios.get('/api/documents');
    setDocuments(result.data);
    setLoading(false);
  };

  const fetchCases = async () => {
    const result = await axios.get('/api/cases');
    setCases(result.data);
  };

  const saveDocument = async (documentData) => {
    try {
      if (selectedDocument) {
        const response = await axios.put(`/api/documents/${selectedDocument._id}`, documentData);
        setDocuments(documents.map(doc => (doc._id === selectedDocument._id ? response.data : doc)));
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
      setDocuments(documents.filter(document => document._id !== id));
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
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Case</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {documents.map((document) => (
                <TableRow key={document._id}>
                  <TableCell>{document.name}</TableCell>
                  <TableCell>{document.type}</TableCell>
                  <TableCell>{document.case.title}</TableCell>
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
      )}
      {formOpen && <DocumentForm document={selectedDocument} cases={cases} onSave={saveDocument} onClose={handleCloseForm} />}
    </div>
  );
};

export default DocumentManagement;
