const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  category: { type: String, enum: ['personal', 'work'], required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
