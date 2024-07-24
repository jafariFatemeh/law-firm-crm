import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const ClientForm = ({ client, onSave, onClose }) => {
  const [name, setName] = useState(client ? client.name : '');
  const [contactInfo, setContactInfo] = useState(client ? client.contactInfo : '');
  const [address, setAddress] = useState(client ? client.address : '');
  const [email, setEmail] = useState(client ? client.email : '');
  const [phone, setPhone] = useState(client ? client.phone : '');

  useEffect(() => {
    if (client) {
      setName(client.name);
      setContactInfo(client.contactInfo);
      setAddress(client.address);
      setEmail(client.email);
      setPhone(client.phone);
    }
  }, [client]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const clientData = { name, contactInfo, address, email, phone };
    onSave(clientData);
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>{client ? 'Edit Client' : 'Add New Client'}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contact Info"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                fullWidth
              />
            </Grid>
          </Grid>
          <DialogActions>
            <Button onClick={onClose} color="secondary">Cancel</Button>
            <Button type="submit" color="primary">Save</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ClientForm;
