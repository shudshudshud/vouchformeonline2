import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/auth/checkAuth`, { withCredentials: true });
        setIsAuthenticated(response.data.isAuthenticated);
      } catch (error) {
        console.error('Error checking authentication status', error);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_API_BASE_URL}/auth/logout`, { withCredentials: true });
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

  // Inline styles object
  const styles = {
    navbar: {
      backgroundColor: '#333',
      color: 'white',
      padding: '10px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    navLeft: {
      display: 'flex',
      alignItems: 'center',
    },
    navRight: {
      display: 'flex',
      alignItems: 'center',
    },
    link: {
      color: 'white',
      marginRight: '15px',
      textDecoration: 'none',
    },
    button: {
      backgroundColor: '#444',
      color: 'white',
      border: 'none',
      padding: '5px 10px',
      cursor: 'pointer',
    },
    buttonHover: {
      backgroundColor: '#555',
    }
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.navLeft}>
        <Link to="/" style={styles.link}>Home</Link>
      </div>
      <div style={styles.navRight}>
        {isAuthenticated ? (
          <>
            <Link to="/new-testimonial" style={styles.link}>Add Testimonial</Link>
            <button 
              style={styles.button} 
              onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
              onMouseOut={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
              onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <a href={`${process.env.REACT_APP_API_BASE_URL}/auth/google`} style={styles.link}>Login</a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
