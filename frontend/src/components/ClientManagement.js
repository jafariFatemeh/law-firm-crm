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
      try {
        const res = await axios.get('api/clients');
        setClients(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchClients();
  }, []);

  const handleAddClient = async (client) => {
    try {
      const res = await axios.post('api/clients', client);
      setClients([...clients, res.data]);
    } catch (err) {
      console.error(err);
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
    <div className="client-management">
      <h1>Client Management</h1>
      <button onClick={() => setEditingClient({ name: '', contactInfo: '' })}>Add New Client</button>
      {editingClient && (
        <ClientForm
          client={editingClient}
          onSave={(client) => {
            editingClient._id ? handleEditClient(client) : handleAddClient(client);
          }}
          onCancel={() => setEditingClient(null)}
        />
      )}
      <table>
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Contact Info</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client._id}>
              <td>{client.name}</td>
              <td>{client.contactInfo}</td>
              <td>
                <button onClick={() => setEditingClient(client)}>Edit</button>
                <button onClick={() => handleDeleteClient(client._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientManagement;
