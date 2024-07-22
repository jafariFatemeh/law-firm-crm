// src/pages/CommunicationTools.js
import React, { useState, useEffect } from 'react';
import axios from '../services/axiosConfig';

const CommunicationTools = () => {
  const [communications, setCommunications] = useState([]);

  useEffect(() => {
    const fetchCommunications = async () => {
      const res = await axios.get('/communications');
      setCommunications(res.data);
    };

    fetchCommunications();
  }, []);

  return (
    <div>
      <h2>Communication Tools</h2>
      <ul>
        {communications.map(communication => (
          <li key={communication._id}>
            {communication.type} - {communication.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommunicationTools;
