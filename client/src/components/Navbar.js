import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    window.location.href = '/';
  };

  return (
    <nav style={{ backgroundColor: '#333', padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
      </div>
      <div>
        {isAuthenticated ? (
          <>
            <Link to="/new-testimonial" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>Add Testimonial</Link>
            <button onClick={handleLogout} style={{ color: 'white', backgroundColor: '#444', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Logout</button>
          </>
        ) : (
          <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
