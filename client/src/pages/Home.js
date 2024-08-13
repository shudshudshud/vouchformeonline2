import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography } from '@mui/material';

function Home() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios({
          baseURL: process.env.REACT_APP_API_BASE_URL,
          url: '/api/testimonials'
        });
        console.log('Fetched Testimonials:', response.data); // Log the fetched data
        setTestimonials(response.data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Vouch For Me Online</h1>
      {testimonials.map((testimonial, index) => (
        <Card key={index} style={{ marginBottom: '20px' }}>
          <CardContent>
            <Typography variant="h5">{testimonial.userId.name}</Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Relationship: {testimonial.userId.relationship}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Category: {testimonial.category}
            </Typography>
            <Typography variant="body1">{testimonial.content}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default Home;
