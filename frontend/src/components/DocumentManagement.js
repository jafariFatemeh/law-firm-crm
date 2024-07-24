// src/pages/DocumentManagement.js
import React, { useEffect, useState } from 'react';
import axios from '../services/axiosConfig';
import './DocumentManagement.css';

const DocumentManagement = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await axios.get('/documents');
        setDocuments(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <div className="document-management">
      <h1>Document Management</h1>
      <div className="documents-list">
        {documents.map((document) => (
          <div key={document._id} className="document-item">
            <h2>{document.title}</h2>
            <p>{document.description}</p>
            <p>{new Date(document.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentManagement;

