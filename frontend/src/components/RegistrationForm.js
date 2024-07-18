import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../services/axiosConfig';
import './Loginreg.css';

function RegistrationForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', { username, password });
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => {
        history.push('/login');
      }, 2000);
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className="registration-container">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegistrationForm;
