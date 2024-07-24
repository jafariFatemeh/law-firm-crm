// src/pages/ClientManagement.js
import React, { useEffect, useState } from 'react';
import axios from '../services/axiosConfig';
import './ClientManagement.css';

const ClientManagement = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await axios.get('api/clients');
        setClients(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchClients();
  }, []);

  return (
    <div className="client-management">
      <h1>Client Management</h1>
      <div className="clients-list">
        {clients.map((client) => (
          <div key={client._id} className="client-item">
            <h2>{client.name}</h2>
            <p>{client.email}</p>
            <p>{client.phone}</p>
            <p>{new Date(client.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientManagement;

