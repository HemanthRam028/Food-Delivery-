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

  // Scroll event handler (useEffect outside any condition)
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('.header');
      if (header) {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        const lastScrollTop = 0; // Reset the scroll position

        if (currentScroll > lastScrollTop && currentScroll > header.offsetHeight) {
          document.body.classList.add('scrolled-down');
        } else {
          document.body.classList.remove('scrolled-down');
        }
      }
    };

    // Add event listener when component mounts
    window.addEventListener('scroll', handleScroll);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array ensures this runs only once after the first render

  if (loading) {
    return null; 
  }

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
