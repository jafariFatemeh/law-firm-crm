// src/pages/DocumentManagement.js
import React, { useState, useEffect } from 'react';
import axios from '../services/axiosConfig';

const DocumentManagement = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      const res = await axios.get('api/documents');
      setDocuments(res.data);
    };

    fetchDocuments();
  }, []);

  return (
    <div>
      <h2>Document Management</h2>
      <ul>
        {documents.map(document => (
          <li key={document._id}>
            {document.title} - {document.client}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentManagement;
