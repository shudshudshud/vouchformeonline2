import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post({
        baseURL: process.env.REACT_APP_API_BASE_URL,
        url: '/api/users/update'
      }, { name, relationship });
      // After updating, redirect to the home page
      window.location.href = '/';
    } catch (error) {
      console.error('Error updating user information:', error);
    }
  };

  return (
    <div>
      <h1>Complete Your Registration</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Relationship:</label>
          <input
            type="text"
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Register;
