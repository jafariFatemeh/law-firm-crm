// src/pages/ClientManagement.js
import React, { useState, useEffect } from 'react';
import axios from '../services/axiosConfig';

const ClientManagement = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      const res = await axios.get('api/clients');
      setClients(res.data);
    };

    fetchClients();
  }, []);

  return (
    <div>
      <h2>Client Management</h2>
      <ul>
        {clients.map(client => (
          <li key={client._id}>
            {client.name} - {client.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientManagement;
