// src/pages/CaseManagement.js
import React, { useState, useEffect } from 'react';
import axios from '../services/axiosConfig';

const CaseManagement = () => {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    const fetchCases = async () => {
      const res = await axios.get('api/cases');
      setCases(res.data);
    };

    fetchCases();
  }, []);

  return (
    <div>
      <h2>Case Management</h2>
      <ul>
        {cases.map(caseItem => (
          <li key={caseItem._id}>
            {caseItem.title} - {caseItem.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CaseManagement;
