import React, { useState, useEffect } from 'react';
import { auth, provider, signInWithPopup, signOut } from './firebase'; 
import logo from './logo1.png'; 
import './Header.css';
import { Link } from 'react-router-dom'; 

const Header = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); 
      setLoading(false); 
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  if (loading) {
    return null; 
  }

  let lastScrollTop = 0; // Keep track of the last scroll position

  window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop && currentScroll > header.offsetHeight) {
      // Scrolling down
      document.body.classList.add('scrolled-down');
    } else {
      // Scrolling up
      document.body.classList.remove('scrolled-down');
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
  });

  // Fallback image if photoURL is not available
  const userPhoto = user?.photoURL || '/default-profile.png';

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
        <Link to="/home"><button>Home</button></Link>
        <Link to="/about"><button>Go to About Page</button></Link>
        <Link to="/cart"><button>Cart</button></Link>
        {user ? (
          <div className="user-info">
            <img src={userPhoto} alt="User Profile" className="user-photo" />
            <span>Hi, {user.displayName}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <button onClick={handleLogin}>Login with Google</button>
        )}
      </nav>
    </header>
  );
};

export default Header;
