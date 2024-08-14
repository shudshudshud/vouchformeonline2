import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, MenuItem, Typography } from '@mui/material';
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode as a named import

function NewTestimonial() {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token); // Decode the token to extract user information
        console.log('Decoded JWT:', decoded); // Log the entire decoded JWT

        // Ensure the userId is correctly extracted from the token
        if (decoded && decoded.user && decoded.user.id) {
          setUserId(decoded.user.id);
          console.log('User ID extracted:', decoded.user.id);
        } else {
          console.error('User ID not found in token:', decoded);
          window.location.href = '/login'; // Redirect to login if no user ID found
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        window.location.href = '/login'; // Redirect to login if decoding fails
      }
    } else {
      window.location.href = '/login'; // Redirect to login if no token
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Include userId in the data being submitted to the backend
      const newTestimonial = { category, title, content, userId };
      console.log('Submitting testimonial data:', newTestimonial); // Log the data being submitted
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/testimonials`, newTestimonial);
      alert('Testimonial submitted successfully');
      window.location.href = '/';
    } catch (error) {
      console.error('Error submitting testimonial:', error.response ? error.response.data : error.message);
      alert('Error submitting testimonial. Please try again.');
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
          required
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
          required
        />

        <Typography variant="h6">Testimonial</Typography>
        <TextField
          value={content}
          onChange={(e) => setContent(e.target.value)}
          fullWidth
          multiline
          rows={4}
          margin="normal"
          required
        />

        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default NewTestimonial;
