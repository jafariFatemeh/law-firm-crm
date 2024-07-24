// src/pages/CommunicationTools.js
import React, { useEffect, useState } from 'react';
import axios from '../services/axiosConfig';
import './CommunicationTools.css';

const CommunicationTools = () => {
  const [communications, setCommunications] = useState([]);

  useEffect(() => {
    const fetchCommunications = async () => {
      try {
        const res = await axios.get('/communications');
        setCommunications(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCommunications();
  }, []);

  return (
    <div className="communication-tools">
      <h1>Communication Tools</h1>
      <div className="communications-list">
        {communications.map((communication) => (
          <div key={communication._id} className="communication-item">
            <h2>{communication.subject}</h2>
            <p>{communication.message}</p>
            <p>{new Date(communication.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunicationTools;

