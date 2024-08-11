import React from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';

function Home() {
  // Replace this with actual data from your backend
  const testimonials = [
    {
      name: 'John Doe',
      relationship: 'Colleague',
      category: 'Work',
      content: 'This is a testimonial about the great work...',
    },
    {
      name: 'Jane Smith',
      relationship: 'Friend',
      category: 'Personal',
      content: 'A wonderful person and a reliable friend...',
    },
  ];

  const isLoggedIn = false; // Replace with actual login state

  return (
    <div style={{ padding: '20px' }}>
      <h1>Vouch For Me Online</h1>
      <Button
        variant="outlined"
        href={isLoggedIn ? '/new-testimonial' : '/login'}
        style={{ marginBottom: '20px' }}
      >
        {isLoggedIn ? 'New Testimonial' : 'Login/Register'}
      </Button>

      {testimonials.map((testimonial, index) => (
        <Card key={index} style={{ marginBottom: '20px' }}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {testimonial.name}
            </Typography>
            <Typography variant="h6" color="textSecondary">
              Relationship: {testimonial.relationship}
            </Typography>
            <Typography variant="h6" color="textSecondary">
              Category: {testimonial.category}
            </Typography>
            <Typography variant="body1">
              {testimonial.content}
            </Typography>
          </CardContent>
        </Card>
      ))}

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p>End of page</p>
      </div>
    </div>
  );
}

export default Home;
