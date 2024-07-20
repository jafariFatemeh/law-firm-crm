// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from '../services/axiosConfig';
import { Line } from 'react-chartjs-2';
import io from 'socket.io-client';
import './Dashboard.css';

const Dashboard = () => {
  const [data, setData] = useState({
    clients: 0,
    cases: 0,
    documents: 0,
    communications: 0,
  });
  const [chartData, setChartData] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/dashboard');
      console.log('Dashboard data:', response.data); // Add this line for debugging
      setData(response.data);
      updateChartData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data', error);
    }
  };

  const updateChartData = (data) => {
    setChartData({
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [
        {
          label: 'Clients',
          data: data.clients,
          fill: false,
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(75,192,192,1)',
        },
        {
          label: 'Cases',
          data: data.cases,
          fill: false,
          backgroundColor: 'rgba(153,102,255,1)',
          borderColor: 'rgba(153,102,255,1)',
        },
        {
          label: 'Documents',
          data: data.documents,
          fill: false,
          backgroundColor: 'rgba(255,159,64,1)',
          borderColor: 'rgba(255,159,64,1)',
        },
        {
          label: 'Communications',
          data: data.communications,
          fill: false,
          backgroundColor: 'rgba(255,205,86,1)',
          borderColor: 'rgba(255,205,86,1)',
        },
      ],
    });
  };

  useEffect(() => {
    fetchData();
    const socket = io(process.env.REACT_APP_API_URL);
    socket.on('updateData', (newData) => {
      console.log('Socket data:', newData); // Add this line for debugging
      setData(newData);
      updateChartData(newData);
    });
    return () => socket.disconnect();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <button onClick={fetchData} className="refresh-button">Refresh Data</button>
      <div className="metrics">
        <div className="metric">
          <h3>Clients</h3>
          <p>{data.clients.length}</p>
        </div>
        <div className="metric">
          <h3>Cases</h3>
          <p>{data.cases.length}</p>
        </div>
        <div className="metric">
          <h3>Documents</h3>
          <p>{data.documents.length}</p>
        </div>
        <div className="metric">
          <h3>Communications</h3>
          <p>{data.communications.length}</p>
        </div>
      </div>
      <div className="chart">
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default Dashboard;




