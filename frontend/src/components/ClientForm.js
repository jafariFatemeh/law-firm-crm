
import './ClientForm.css';
import React, { useState } from 'react';

const ClientForm = ({ onSave }) => {
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name || !contactInfo || !email) {
      alert('Name, contact info, and email are required');
      return;
    }
    const newClient = { name, contactInfo, address, email, phone };
    onSave(newClient);
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <input type="text" value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} placeholder="Contact Info" required />
      <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
      <button type="submit">Save</button>
    </form>
  );
};

export default ClientForm;
