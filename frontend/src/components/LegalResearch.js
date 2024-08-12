import React, { useState } from 'react';
import axios from '../services/axiosConfig';
import { Button, TextField, Typography } from '@mui/material';

const LegalResearch = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('document', selectedFile);

    try {
      const response = await axios.post('/api/legal-research/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setAnalysis(response.data.analysis);
    } catch (error) {
      console.error('Error uploading document:', error);
      alert('Error uploading document');
    }
  };

  return (
    <div>
      <Typography variant="h4">Upload Legal Document for Research</Typography>
      <form onSubmit={handleSubmit}>
        <TextField type="file" onChange={handleFileChange} />
        <Button type="submit" variant="contained" color="primary">Upload</Button>
      </form>
      {analysis && (
        <div>
          <Typography variant="h6">Analysis Results</Typography>
          <Typography variant="body1"><strong>Summary:</strong></Typography>
          <Typography variant="body2">{analysis.summary}</Typography>
          <Typography variant="body1"><strong>Entities:</strong></Typography>
          {analysis.entities.map((entity, index) => (
            <Typography key={index} variant="body2">{entity.text} - {entity.label}</Typography>
          ))}
          <Typography variant="body1"><strong>Relevant Precedents:</strong></Typography>
          {analysis.precedents.map((precedent, index) => (
            <Typography key={index} variant="body2">{precedent}</Typography>
          ))}
        </div>
      )}
    </div>
  );
};

export default LegalResearch;
