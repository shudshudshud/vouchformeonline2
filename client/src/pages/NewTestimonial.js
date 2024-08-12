import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, MenuItem, Typography } from '@mui/material';

function NewTestimonial() {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId] = useState(''); // Replace with actual user ID fetching logic

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTestimonial = { category, title, content, userId };
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/testimonials`, newTestimonial);
      alert('Testimonial submitted successfully');
    } catch (error) {
      console.error('Error submitting testimonial:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Submit a New Testimonial
      </Typography>
      <form onSubmit={handleSubmit}>
        <Typography variant="h6">Category</Typography>
        <TextField
          select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
          margin="normal"
        >
          <MenuItem value="personal">Personal</MenuItem>
          <MenuItem value="work">Work</MenuItem>
        </TextField>

        <Typography variant="h6">Title</Typography>
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />

        <Typography variant="h6">Testimonial</Typography>
        <TextField
          value={content}
          onChange={(e) => setContent(e.target.value)}
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />

        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default NewTestimonial;
