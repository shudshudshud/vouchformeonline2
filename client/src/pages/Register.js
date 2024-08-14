import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    relationship: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form data:', formData); // Log the data being submitted
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/register`, formData);
      console.log('Registration successful, token received:', response.data.token); // Log the successful registration
      localStorage.setItem('token', response.data.token);
      window.location.href = '/';
    } catch (error) {
      console.error('Error registering:', error.response ? error.response.data : error.message); // Log the detailed error response
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <TextField
            label="Relationship"
            name="relationship"
            value={formData.relationship}
            onChange={handleChange}
            fullWidth
          />
        </div>
        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
      </form>
    </div>
  );
};

export default Register;
