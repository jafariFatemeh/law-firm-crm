import React, { useState } from 'react';
import axios from 'axios';
import './Loginreg.css';

const RegistrationForm = ({ onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const { name, email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      onRegisterSuccess();
    } catch (err) {
      setError(err.response.data.message || 'Registration error');
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={onSubmit}>
        <h2>Register</h2>
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" value={name} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={email} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" value={password} onChange={onChange} required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
