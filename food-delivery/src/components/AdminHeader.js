import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, provider, signInWithPopup, signOut } from './firebase';
import logo from './logo1.png';
import './Header.css';

const Header = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // State to track if user is admin
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        setIsAdmin(user.email === 'hemanthram064@gmail.com'); // Check if admin
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      provider.setCustomParameters({
        prompt: 'select_account',
      });
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error during Google login:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('Admin logged out successfully');
      navigate('/'); // Redirect to login page
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleHomeClick = () => {
    navigate('/homes');
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleAboutClick = () => {
    navigate('/about');
  };

  if (loading) {
    return null; // Show nothing or a loader while checking authentication state
  }

  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo1" />
      </div>

      <div className="search-container">
        <h1 className="glow-text">BHOJANA</h1>
        <input type="text" className="search-bar" placeholder="Search for restaurants or dishes..." />
      </div>

      <nav className="nav">
        <button onClick={handleHomeClick}>Home</button>
        <button onClick={handleAboutClick}>About</button>
        <button onClick={handleCartClick}>Cart</button>
        
        {isAdmin ? (
          <div className="admin-info">
            <span>Welcome Admin</span>
            <button onClick={handleLogout}>Admin Logout</button>
          </div>
        ) : (
          <></> // Show nothing for non-admin users
        )}
      </nav>
    </header>
  );
};

export default Header;
