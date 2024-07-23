import React, { useState } from 'react';
import axios from '../services/axiosConfig';
import './Loginreg.css';

const RegistrationForm = ({ onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/register', { name, email, password });
      onRegisterSuccess(res.data.token); // Pass the token to the parent component
    } catch (err) {
      console.error('Registration error:', err.response.data);
    }
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <h1>Register</h1>
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
  );
};

export default RegistrationForm;
