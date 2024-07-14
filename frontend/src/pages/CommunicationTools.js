// src/pages/CommunicationTools.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommunicationTools = () => {
  const [communications, setCommunications] = useState([]);
  const [newCommunication, setNewCommunication] = useState({ message: '', clientId: '' });

  useEffect(() => {
    // Fetch communications from the backend
    const fetchCommunications = async () => {
      try {
        const response = await axios.get('/api/communications');
        setCommunications(response.data);
      } catch (error) {
        console.error('Error fetching communications', error);
      }
    };
    fetchCommunications();
  }, []);

  const handleSendCommunication = async () => {
    try {
      const response = await axios.post('/api/communications', newCommunication);
      setCommunications([...communications, response.data]);
      setNewCommunication({ message: '', clientId: '' });
    } catch (error) {
      console.error('Error sending communication', error);
    }
  };

  return (
    <div className="communication-tools">
      <h2>Communication Tools</h2>
      <div>
        <textarea
          placeholder="Message"
          value={newCommunication.message}
          onChange={(e) => setNewCommunication({ ...newCommunication, message: e.target.value })}
        />
        <input
          type="text"
          placeholder="Client ID"
          value={newCommunication.clientId}
          onChange={(e) => setNewCommunication({ ...newCommunication, clientId: e.target.value })}
        />
        <button onClick={handleSendCommunication}>Send</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Message</th>
            <th>Client ID</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {communications.map((comm) => (
            <tr key={comm.id}>
              <td>{comm.message}</td>
              <td>{comm.clientId}</td>
              <td>{comm.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommunicationTools;
