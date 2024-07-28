// src/pages/DocumentManagement.js
import React, { useState, useEffect } from 'react';
import axios from '../services/axiosConfig';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import DocumentForm from './DocumentForm';

const DocumentManagement = ({ caseId }) => {
  const [documents, setDocuments] = useState([]);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    fetchDocuments();
  }, [caseId]);

  const fetchDocuments = async () => {
    const result = await axios.get(`/api/documents/case/${caseId}`);
    setDocuments(result.data);
  };

  const saveDocument = async (formData) => {
    try {
      const response = await axios.post('/api/documents', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setDocuments([...documents, response.data]);
      setFormOpen(false);
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
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
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
              <TableCell>File URL</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents.map((document) => (
              <TableRow key={document._id}>
                <TableCell>{document.title}</TableCell>
                <TableCell>
                  <a href={`/${document.fileUrl}`} target="_blank" rel="noopener noreferrer">
                    View File
                  </a>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => deleteDocument(document._id)} color="secondary">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {formOpen && <DocumentForm caseId={caseId} onSave={saveDocument} onClose={handleCloseForm} />}
    </div>
  );
};

export default DocumentManagement;
