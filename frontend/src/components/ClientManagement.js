// src/pages/ClientManagement.js
import React, { useEffect, useState } from 'react';
import axios from '../services/axiosConfig';
import ClientForm from './ClientForm';
import './ClientManagement.css';

const ClientManagement = () => {
  const [clients, setClients] = useState([]);
  const [editingClient, setEditingClient] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      const result = await axios.get('https://backend-0vwz.onrender.com/api/clients');
      setClients(result.data);
    };
    fetchClients();
  }, []);


const saveClient = async (client) => {
    try {
      const response = await axios.post('https://backend-0vwz.onrender.com/api/clients', client);
      setClients([...clients, response.data]);
    } catch (error) {
      console.error('Error saving client:', error);
      alert(`Error: ${error.response?.data?.message || 'Could not save client'}`);
    }
  };

  const handleEditClient = async (client) => {
    try {
      const res = await axios.put(`api/clients/${client._id}`, client);
      setClients(clients.map((c) => (c._id === client._id ? res.data : c)));
      setEditingClient(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteClient = async (id) => {
    try {
      await axios.delete(`api/clients/${id}`);
      setClients(clients.filter((client) => client._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Client Management</h2>
      <ClientForm onSave={saveClient} />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact Info</th>
            <th>Address</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client._id}>
              <td>{client.name}</td>
              <td>{client.contactInfo}</td>
              <td>{client.address}</td>
              <td>{client.email}</td>
              <td>{client.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientManagement;
