// src/pages/CaseManagement.js
import React, { useState, useEffect } from 'react';
import axios from '../services/axiosConfig';

const CaseManagement = () => {
  const [cases, setCases] = useState([]);
  const [newCase, setNewCase] = useState({ caseName: '', caseDescription: '', clientId: '' });

  useEffect(() => {
    // Fetch cases from the backend
    const fetchCases = async () => {
      try {
        const response = await axios.get('/api/cases');
        setCases(response.data);
      } catch (error) {
        console.error('Error fetching cases', error);
      }
    };
    fetchCases();
  }, []);

  const handleAddCase = async () => {
    try {
      const response = await axios.post('/api/cases', newCase);
      setCases([...cases, response.data]);
      setNewCase({ caseName: '', caseDescription: '', clientId: '' });
    } catch (error) {
      console.error('Error adding case', error);
    }
  };

  return (
    <div className="case-management">
      <h2>Case Management</h2>
      <div>
        <input
          type="text"
          placeholder="Case Name"
          value={newCase.caseName}
          onChange={(e) => setNewCase({ ...newCase, caseName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Case Description"
          value={newCase.caseDescription}
          onChange={(e) => setNewCase({ ...newCase, caseDescription: e.target.value })}
        />
        <input
          type="text"
          placeholder="Client ID"
          value={newCase.clientId}
          onChange={(e) => setNewCase({ ...newCase, clientId: e.target.value })}
        />
        <button onClick={handleAddCase}>Add Case</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Case Name</th>
            <th>Case Description</th>
            <th>Client ID</th>
          </tr>
        </thead>
        <tbody>
          {cases.map((caseItem) => (
            <tr key={caseItem.id}>
              <td>{caseItem.caseName}</td>
              <td>{caseItem.caseDescription}</td>
              <td>{caseItem.clientId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CaseManagement;
