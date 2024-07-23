import React, { useState } from 'react';
import axios from 'axios';
import './Loginreg.css';

const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      onLoginSuccess(res.data.token);
    } catch (err) {
      setError(err.response.data.message || 'Login error');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={onSubmit}>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={email} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" value={password} onChange={onChange} required />
        </div>
        <button type="submit">Login</button>
        <p>Don't have an account? <button href="/register">Register</button></p>
      </form>
    </div>
  );
};

export default Login;

