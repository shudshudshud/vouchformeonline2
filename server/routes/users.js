const express = require('express');
const router = express.Router();
const User = require('../models/User');

// @route   POST /api/users/update
// @desc    Update user's name and relationship
router.post('/update', async (req, res) => {
  try {
    const { name, relationship } = req.body;
    const userId = req.user._id;

    const updatedUser = await User.findByIdAndUpdate(userId, { name, relationship }, { new: true });

    res.json(updatedUser);
  } catch (err) {
    console.error('Error updating user information:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;  // Ensure that you are exporting the router
