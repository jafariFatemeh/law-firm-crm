// src/pages/DocumentManagement.js
import React, { useState, useEffect } from 'react';
import axios from '../services/axiosConfig';

const DocumentManagement = () => {
  const [documents, setDocuments] = useState([]);
  const [newDocument, setNewDocument] = useState({ documentName: '', caseId: '', file: null });

  useEffect(() => {
    // Fetch documents from the backend
    const fetchDocuments = async () => {
      try {
        const response = await axios.get('/documents');
        setDocuments(response.data);
      } catch (error) {
        console.error('Error fetching documents', error);
      }
    };
    fetchDocuments();
  }, []);

  const handleAddDocument = async () => {
    const formData = new FormData();
    formData.append('documentName', newDocument.documentName);
    formData.append('caseId', newDocument.caseId);
    formData.append('file', newDocument.file);

    try {
      const response = await axios.post('/api/documents', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setDocuments([...documents, response.data]);
      setNewDocument({ documentName: '', caseId: '', file: null });
    } catch (error) {
      console.error('Error adding document', error);
    }
  };

  return (
    <div className="document-management">
      <h2>Document Management</h2>
      <div>
        <input
          type="text"
          placeholder="Document Name"
          value={newDocument.documentName}
          onChange={(e) => setNewDocument({ ...newDocument, documentName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Case ID"
          value={newDocument.caseId}
          onChange={(e) => setNewDocument({ ...newDocument, caseId: e.target.value })}
        />
        <input
          type="file"
          onChange={(e) => setNewDocument({ ...newDocument, file: e.target.files[0] })}
        />
        <button onClick={handleAddDocument}>Add Document</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Document Name</th>
            <th>Case ID</th>
            <th>File Path</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id}>
              <td>{doc.documentName}</td>
              <td>{doc.caseId}</td>
              <td>{doc.filePath}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentManagement;
