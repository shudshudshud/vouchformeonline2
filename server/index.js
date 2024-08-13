const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const path = require('path');

const app = express();
app.use(cors());

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

// Session middleware
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Import Routes and Log Their Types
const authRoutes = require('./routes/auth');
console.log("Auth Routes:", typeof authRoutes);  // Should log 'function' or 'object'

const testimonialRoutes = require('./routes/testimonials');
console.log("Testimonial Routes:", typeof testimonialRoutes);  // Should log 'function' or 'object'

const userRoutes = require('./routes/users');
console.log("User Routes:", typeof userRoutes);  // Should log 'function' or 'object')

// Routes
app.use('/auth', authRoutes); 
app.use('/api/testimonials', testimonialRoutes); 
app.use('/api/users', userRoutes); 

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// The "catchall" handler: for any request that doesn't match one above, send back the React app.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// 404 Handler
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Error logging middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
