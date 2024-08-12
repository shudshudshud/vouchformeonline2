const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

const router = express.Router();

// Google OAuth Strategy Configuration
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"  // This callback URL is used both locally and in production
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if a user with the same email already exists
      let user = await User.findOne({ email: profile.emails[0].value });
      if (user) {
        // If user exists, update their Google ID and proceed
        user.googleId = profile.id;
        await user.save();
      } else {
        // If user doesn't exist, create a new one
        user = new User({
          googleId: profile.id,
          name: profile.displayName || '', // Default to an empty string if name is missing
          email: profile.emails[0].value,
          relationship: '' // Start with an empty relationship field
        });
        await user.save();
      }
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  }
));

// Serialize the user for the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize the user from the session using async/await
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Route to start the OAuth flow
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// OAuth callback route
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Check if the user needs to complete their profile
    if (!req.user.name || !req.user.relationship) {
      // If either name or relationship is missing, redirect to the registration page
      res.redirect('/register');
    } else {
      // Otherwise, redirect to the home page
      res.redirect('/');
    }
  }
);

// Logout route
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

// Route to check authentication status
router.get('/checkAuth', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ isAuthenticated: true, user: req.user });
  } else {
    res.json({ isAuthenticated: false });
  }
});

module.exports = router;
