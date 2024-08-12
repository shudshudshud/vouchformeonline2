const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false, // Make `name` optional
  },
  email: {
    type: String,
    required: true,
  },
  relationship: {
    type: String,
    required: false, // Make `relationship` optional
  }
});

module.exports = mongoose.model('User', UserSchema);
