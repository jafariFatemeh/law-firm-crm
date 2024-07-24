import React, { useState, useEffect } from 'react';
import './ClientForm.css';

const ClientForm = ({ client, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ name: '', contactInfo: '' });

  useEffect(() => {
    if (client) {
      setFormData({ name: client.name, contactInfo: client.contactInfo });
    }
  }, [client]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...client, ...formData });
  };

  return (
    <form className="client-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Contact Info</label>
        <input
          type="text"
          name="contactInfo"
          value={formData.contactInfo}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-actions">
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default ClientForm;
