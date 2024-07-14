// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from '../services/axiosConfig';

const Dashboard = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    // Fetch dashboard data from the backend
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
    <div className="dashboard">
      <h2>Dashboard</h2>
      {/* Display key metrics */}
      <div className="metrics">
        <div className="metric">Clients: {data.clients}</div>
        <div className="metric">Cases: {data.cases}</div>
        <div className="metric">Documents: {data.documents}</div>
        <div className="metric">Communications: {data.communications}</div>
      </div>
    </div>
  );
};

export default Dashboard;
