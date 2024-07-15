import React, { useEffect, useState } from 'react';
import axios from './services/axiosConfig';
import './App.css';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('/health-check')
      .then(response => {
        setData(response.data.message);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Your CRM App</h1>
        <p>
          {data ? `Backend Response: ${data}` : "Loading..."}
        </p>
      </header>
    </div>
  );
}

export default App;
