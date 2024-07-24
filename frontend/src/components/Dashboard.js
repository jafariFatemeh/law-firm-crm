// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from '../services/axiosConfig';
import './Dashboard.css';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    recentCases: [],
    recentClients: [],
    upcomingDeadlines: [],
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get('/dashboard/data');
        setDashboardData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="metrics">
        <div className="metric-item">
          <h2>Recent Cases</h2>
          <ul>
            {dashboardData.recentCases.map((caseItem) => (
              <li key={caseItem._id}>
                {caseItem.title} - {new Date(caseItem.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
        <div className="metric-item">
          <h2>Recent Clients</h2>
          <ul>
            {dashboardData.recentClients.map((client) => (
              <li key={client._id}>
                {client.name} - {new Date(client.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
        <div className="metric-item">
          <h2>Upcoming Deadlines</h2>
          <ul>
            {dashboardData.upcomingDeadlines.map((document) => (
              <li key={document._id}>
                {document.title} - {new Date(document.deadline).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
