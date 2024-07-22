// src/components/Login.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../services/axiosConfig';
import './Loginreg.css';

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
      const res = await axios.post('/api/auth/login', { username, password });
      setToken(res.data.token);
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
      <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <button onClick={() => history.push('/register')}>Register</button>
    </div>
  );
}

export default Login;
