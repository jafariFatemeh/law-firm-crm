// src/pages/Dashboard.js
import React, { useEffect, useState, useCallback } from 'react';
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const updateChartData = useCallback((data) => {
    setChartData({
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [
        {
          label: 'Clients',
          data: data.clients || [0, 0, 0, 0, 0, 0],
          fill: false,
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(75,192,192,1)',
        },
        {
          label: 'Cases',
          data: data.cases || [0, 0, 0, 0, 0, 0],
          fill: false,
          backgroundColor: 'rgba(153,102,255,1)',
          borderColor: 'rgba(153,102,255,1)',
        },
        {
          label: 'Documents',
          data: data.documents || [0, 0, 0, 0, 0, 0],
          fill: false,
          backgroundColor: 'rgba(255,159,64,1)',
          borderColor: 'rgba(255,159,64,1)',
        },
        {
          label: 'Communications',
          data: data.communications || [0, 0, 0, 0, 0, 0],
          fill: false,
          backgroundColor: 'rgba(255,205,86,1)',
          borderColor: 'rgba(255,205,86,1)',
        },
      ],
    });
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/dashboard');
      console.log('Dashboard data:', response.data); // Debugging log
      setData(response.data);
      updateChartData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data', error);
      setError('Failed to load dashboard data.');
      setLoading(false);
    }
  }, [updateChartData]);

  useEffect(() => {
    fetchData();
    const socket = io(process.env.REACT_APP_API_URL, {
      transports: ['websocket'], // Ensure WebSocket transport is used
    });

    socket.on('connect', () => {
      console.log('WebSocket connected');
    });

    socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    socket.on('updateData', (newData) => {
      console.log('Socket data:', newData); // Debugging log
      setData(newData);
      updateChartData(newData);
    });

    // Cleanup function to close the WebSocket connection when the component unmounts
    return () => {
      if (socket.connected) {
        socket.disconnect();
      }
    };
  }, [fetchData, updateChartData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <button onClick={fetchData} className="refresh-button">Refresh Data</button>
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
      <div className="chart">
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default Dashboard;


