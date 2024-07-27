import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from '@mui/material';

const CaseForm = ({ caseItem, clients, onSave, onClose }) => {
  const [title, setTitle] = useState(caseItem ? caseItem.title : '');
  const [description, setDescription] = useState(caseItem ? caseItem.description : '');
  const [status, setStatus] = useState(caseItem ? caseItem.status : '');
  const [client, setClient] = useState(caseItem ? caseItem.client._id : '');

  useEffect(() => {
    if (caseItem) {
      setTitle(caseItem.title);
      setDescription(caseItem.description);
      setStatus(caseItem.status);
      setClient(caseItem.client._id);
    }
  }, [caseItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const caseData = { title, description, status, client };
    onSave(caseData);
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>{caseItem ? 'Edit Case' : 'Add New Case'}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                label="Client"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                fullWidth
                required
              >
                {clients.map(client => (
                  <MenuItem key={client._id} value={client._id}>
                    {client.name}
                  </MenuItem>
                ))}
              </TextField>
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

export default CaseForm;
