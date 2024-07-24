// src/pages/CaseManagement.js
import React, { useEffect, useState } from 'react';
import axios from '../services/axiosConfig';
import './CaseManagement.css';

const CaseManagement = () => {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await axios.get('api/cases');
        setCases(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCases();
  }, []);

  return (
    <div className="case-management">
      <h1>Case Management</h1>
      <div className="cases-list">
        {cases.map((caseItem) => (
          <div key={caseItem._id} className="case-item">
            <h2>{caseItem.title}</h2>
            <p>{caseItem.description}</p>
            <p>{new Date(caseItem.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseManagement;
