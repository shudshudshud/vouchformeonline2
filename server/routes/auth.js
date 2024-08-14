const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  const { name, email, password, relationship } = req.body;

  console.log('Received registration data:', req.body); // Log the incoming request data

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      console.log('User already exists:', email); // Log if user already exists
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user with provided details and current date
    user = new User({
      name,
      email,
      password,
      relationship,
      date: Date.now(),
    });

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save the new user
    await user.save();
    console.log('User registered successfully:', email); // Log successful registration

    // Create payload for JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    console.log('JWT Payload:', payload); // Log the JWT payload to ensure it contains the correct user ID

    // Generate JWT token
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) {
        console.error('Error generating JWT:', err.message); // Log JWT generation error
        return res.status(500).json({ message: 'Error generating token' });
      }
      res.json({ token });
    });
  } catch (err) {
    console.error('Server error:', err.message); // Log the error message
    res.status(500).json({ message: 'Server error' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log('Login attempt with email:', email); // Log the login attempt

  try {
    // Find user by email
    let user = await User.findOne({ email });
    if (!user) {
      console.log('Invalid email:', email); // Log invalid email
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Invalid password for email:', email); // Log invalid password
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create payload for JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    console.log('JWT Payload:', payload); // Log the JWT payload during login

    // Generate JWT token
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) {
        console.error('Error generating JWT:', err.message); // Log JWT generation error
        return res.status(500).json({ message: 'Error generating token' });
      }
      res.json({ token });
    });
  } catch (err) {
    console.error('Server error:', err.message); // Log the error message
    res.status(500).json({ message: 'Server error' });
  }
});

// Protected route example
router.get('/me', authMiddleware, async (req, res) => {
  try {
    // Retrieve user details excluding the password
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error('Server error:', err.message); // Log the error message
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
