import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Divider, Paper } from '@mui/material';

function Home() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setError('Failed to load testimonials');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h1>Vouch For Me Online</h1>
      
      {/* Project Info Box */}
      <Paper elevation={2} sx={{ padding: '25px', marginBottom: '30px' }}>
        <Typography variant="h5" gutterBottom color="primary">
          Developer Portfolio Project
        </Typography>
        <Typography variant="body1" paragraph>
          This web application was built to demonstrate my full-stack development capabilities using
          Node.js, Express, React, and MongoDB. It was originally hosted on AWS EC2 with file storage on S3.
        </Typography>
        <Typography variant="body1" paragraph>
          I have bigger ambitions to expand this into a complete testimonial management platform with additional features
          like testimonial verification, customizable displays, and integration with professional networks.
        </Typography>
        <Typography variant="body1" paragraph fontWeight="bold">
          Note: My AWS account is currently disabled. Below is a link to a PDF showing how the application
          looked when it was fully functional:
        </Typography>
        
        <Button 
          variant="contained" 
          color="primary"
          size="large"
          component="a" 
          href="https://drive.google.com/file/d/11zCZr3f8VOGGnk1ZGIqNffZsB7Q_Ewsb/view?usp=sharing" 
          target="_blank"
          rel="noopener noreferrer"
          sx={{ mt: 2 }}
        >
          View Application Screenshots
        </Button>
      </Paper>
      
      <Divider sx={{ marginBottom: '20px' }} />
      
      {loading ? (
        <p>Loading testimonials...</p>
      ) : error ? (
        <p>{error}</p>
      ) : testimonials.length > 0 ? (
        testimonials.map((testimonial, index) => (
          <Card key={index} style={{ marginBottom: '20px' }}>
            <CardContent>
              <Typography variant="h5">
                {testimonial.userId?.name || 'Anonymous'}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Relationship: {testimonial.userId?.relationship || 'Unknown'}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                Category: {testimonial.category}
              </Typography>
              <Typography variant="body1">{testimonial.content}</Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <p>No testimonials found.</p>
      )}
    </div>
  );
}

export default Home;
