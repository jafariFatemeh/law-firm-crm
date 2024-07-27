import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from '@mui/material';

const DocumentForm = ({ document, cases, onSave, onClose }) => {
  const [name, setName] = useState(document ? document.name : '');
  const [type, setType] = useState(document ? document.type : '');
  const [caseId, setCaseId] = useState(document ? document.case._id : '');
  const [url, setUrl] = useState(document ? document.url : '');

  useEffect(() => {
    if (document) {
      setName(document.name);
      setType(document.type);
      setCaseId(document.case._id);
      setUrl(document.url);
    }
  }, [document]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const documentData = { name, type, case: caseId, url };
    onSave(documentData);
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>{document ? 'Edit Document' : 'Add New Document'}</DialogTitle>
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
                label="Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                label="Case"
                value={caseId}
                onChange={(e) => setCaseId(e.target.value)}
                fullWidth
                required
              >
                {cases.map(caseItem => (
                  <MenuItem key={caseItem._id} value={caseItem._id}>
                    {caseItem.title}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
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

export default DocumentForm;
