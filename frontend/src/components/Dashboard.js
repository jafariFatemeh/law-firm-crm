// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from '../services/axiosConfig';
import './Dashboard.css';

const Dashboard = () => {
  const [data, setData] = useState({ clients: 0, cases: 0, documents: 0, communications: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/dashboard');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="metrics">
        <div className="metric">
          <h3>Clients</h3>
          <p>{data.clients}</p>
        </div>
        <div className="metric">
          <h3>Cases</h3>
          <p>{data.cases}</p>
        </div>
        <div className="metric">
          <h3>Documents</h3>
          <p>{data.documents}</p>
        </div>
        <div className="metric">
          <h3>Communications</h3>
          <p>{data.communications}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

