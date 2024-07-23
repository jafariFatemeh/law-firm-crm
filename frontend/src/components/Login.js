import React, { useState } from 'react';
import axios from '../services/axiosConfig';
import './Loginreg.css';

const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      onLoginSuccess(res.data.token);
    } catch (err) {
      console.error('Login error:', err.response.data);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={onSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={email} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" value={password} onChange={onChange} required />
        </div>
        <button type="submit">Login</button>
        <button> <a href="/register">Register</a> </button>
      </form>
    </div>
  );
};

export default Login;

