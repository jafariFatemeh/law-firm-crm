// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from '../services/axiosConfig';
import './Dashboard.css';

const Dashboard = () => {
  const [cases, setCases] = useState([]);
  const [clients, setClients] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [communications, setCommunications] = useState([]);

  useEffect(() => {

      const fetchData = async () => {
        try {
          const casesRes = await axios.get('api/cases');
          setCases(casesRes.data);
  
          const clientsRes = await axios.get('api/clients');
          setClients(clientsRes.data);
  
          const documentsRes = await axios.get('api/documents');
          setDocuments(documentsRes.data);
  
          const communicationsRes = await axios.get('api/communications');
          setCommunications(communicationsRes.data);
        } catch (err) {
          console.error(err);
        }
      };

    fetchData();
  }, []);

  return (
    <main className="main-content">
          <h1>Welcome to Your CRM Dashboard</h1>
          <div className="widgets">
            <div className="widget">
              <h2>Clients Overview</h2>
              <p>Total Clients: {clients.length}</p>
            </div>
            <div className="widget">
              <h2>Cases Overview</h2>
              <p>Total Cases: {cases.length}</p>
            </div>
            <div className="widget">
              <h2>Documents Overview</h2>
              <p>Total Documents: {documents.length}</p>
            </div>
            <div className="widget">
              <h2>Communications Overview</h2>
              <p>Total Communications: {communications.length}</p>
              </div>
            </div>
        </main>
  );
};

export default Dashboard;
