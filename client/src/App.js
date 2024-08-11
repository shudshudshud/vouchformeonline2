import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import NewTestimonial from './pages/NewTestimonial';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/new-testimonial" element={<NewTestimonial />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
