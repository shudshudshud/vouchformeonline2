import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NewTestimonial from './pages/NewTestimonial';
import Login from './pages/Login';
import Register from './pages/Register';  // Import the Register component
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-testimonial" element={<NewTestimonial />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />  {/* Add the Register route */}
      </Routes>
    </Router>
  );
}

export default App;
