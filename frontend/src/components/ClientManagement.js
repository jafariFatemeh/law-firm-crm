// src/pages/ClientManagement.js
import React, { useState, useEffect } from 'react';
import axios from '../services/axiosConfig';

const ClientManagement = () => {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({ firstName: '', lastName: '', email: '' });

  useEffect(() => {
    // Fetch clients from the backend
    const fetchClients = async () => {
      try {
        const response = await axios.get('/clients');
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching clients', error);
      }
    };
    fetchClients();
  }, []);

  const handleAddClient = async () => {
    try {
      const response = await axios.post('/api/clients', newClient);
      setClients([...clients, response.data]);
      setNewClient({ firstName: '', lastName: '', email: '' });
    } catch (error) {
      console.error('Error adding client', error);
    }
  };

  return (
    <div className="client-management">
      <h2>Client Management</h2>
      <div>
        <input
          type="text"
          placeholder="First Name"
          value={newClient.firstName}
          onChange={(e) => setNewClient({ ...newClient, firstName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={newClient.lastName}
          onChange={(e) => setNewClient({ ...newClient, lastName: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newClient.email}
          onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
        />
        <button onClick={handleAddClient}>Add Client</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.firstName}</td>
              <td>{client.lastName}</td>
              <td>{client.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientManagement;
