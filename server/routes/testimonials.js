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
  try {
    const { category, title, content, userId } = req.body;

    // Validate userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newTestimonial = new Testimonial({
      category,
      title,
      content,
      userId,
    });

    const testimonial = await newTestimonial.save();
    res.json(testimonial);
  } catch (err) {
    console.error('Error creating testimonial:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
