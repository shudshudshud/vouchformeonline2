const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');
const User = require('../models/User');

// @route   GET /api/testimonials
// @desc    Get all testimonials, sorted by latest
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find()
      .populate('userId', 'name relationship')
      .sort({ date: -1 });
    console.log('Fetched Testimonials:', testimonials); // Log the fetched testimonials
    res.json(testimonials);
  } catch (err) {
    console.error('Error fetching testimonials:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/testimonials
// @desc    Create a new testimonial
router.post('/', async (req, res) => {
  const { category, title, content, userId } = req.body;
  
  console.log('Received testimonial data:', req.body); // Log the received data

  try {
    // Validate userId
    console.log(userId)
    const user = await User.findById(userId);
    if (!user) {
      console.error('User not found:', userId); // Log if the user is not found
      return res.status(404).json({ message: 'User not found' });
    }

    const newTestimonial = new Testimonial({
      category,
      title,
      content,
      userId,
    });

    const testimonial = await newTestimonial.save();
    console.log('Testimonial created successfully:', testimonial); // Log successful creation
    res.json(testimonial);
  } catch (err) {
    console.error('Error creating testimonial:', err.message); // Log the error message
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
