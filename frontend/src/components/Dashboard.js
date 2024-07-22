// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from '../services/axiosConfig';
import './Dashboard.css';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({});

  useEffect(() => {
    const fetchDashboardData = async () => {
      const res = await axios.get('/dashboard');
      setDashboardData(res.data);
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="dashboard-stats">
        <div className="stat-item">
          <h3>Cases</h3>
          <p>{dashboardData.cases}</p>
        </div>
        <div className="stat-item">
          <h3>Clients</h3>
          <p>{dashboardData.clients}</p>
        </div>
        <div className="stat-item">
          <h3>Communications</h3>
          <p>{dashboardData.communications}</p>
        </div>
        <div className="stat-item">
          <h3>Documents</h3>
          <p>{dashboardData.documents}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
