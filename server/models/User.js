const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  relationship: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,  // Automatically fills with the current date
  },
});

module.exports = mongoose.model('User', UserSchema);
