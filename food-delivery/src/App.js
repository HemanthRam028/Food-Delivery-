import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { auth, signInWithPopup, provider } from './components/firebase';
import LoginPage from './components/LoginPage';
import Home from './components/Home';
import About from './components/About';
import Privacy from './components/Privacy';
import TermsOfService from './components/TermsOfService';
import ContactUs from './components/ContactUs';
import RestaurantList from './components/RestaurantList';
import MenuPage from './components/MenuPage';
import AdminPage from './components/AdminPage';
import MenuList from './components/MenuList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Test Backend Connection
  const checkBackendConnection = async () => {
    try {
      const response = await axios.get('http://localhost:5002');
      console.log('Response from backend:', response.data);
    } catch (error) {
      console.error('Error connecting to backend:', error);
    }
  };

  useEffect(() => {
    checkBackendConnection(); // Test backend connection on component mount

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  // Load data from localStorage
  useEffect(() => {
    const storedRestaurants = JSON.parse(localStorage.getItem('restaurants')) || [];
    const storedMenuItems = JSON.parse(localStorage.getItem('menuItems')) || [];
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    setRestaurants(storedRestaurants);
    setMenuItems(storedMenuItems);
    setCartItems(storedCartItems);
  }, []);

  // Store cart items in localStorage when it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleLogin = async () => {
    try {
      provider.setCustomParameters({ prompt: 'select_account' });
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error during Google login:', error);
    }
  };

  const handleAdminLogin = async () => {
    try {
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, provider);
      const adminEmail = 'hemanthram064@gmail.com';
      if (result.user.email === adminEmail) {
        navigate('/admin');
      } else {
        alert('You must sign in with the authorized admin account.');
        auth.signOut();
      }
    } catch (error) {
      console.error('Error during admin login:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            !user ? (
              <LoginPage onLogin={handleLogin} onAdminLogin={handleAdminLogin} />
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route
          path="/home"
          element={user ? <Home restaurants={restaurants} menuItems={menuItems} /> : <Navigate to="/" />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/restaurant-list" element={<RestaurantList restaurants={restaurants} />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/checkout" element={<Checkout cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route
          path="/menu/:id"
          element={<MenuPage restaurants={restaurants} menuItems={menuItems} cartItems={cartItems} setCartItems={setCartItems} />}
        />
        <Route
          path="/cart"
          element={<Cart cartItems={cartItems} setCartItems={setCartItems} />}
        />
        <Route
          path="/admin"
          element={
            user && user.email === 'hemanthram064@gmail.com' ? (
              <AdminPage
                restaurants={restaurants}
                setRestaurants={setRestaurants}
                menuItems={menuItems}
                setMenuItems={setMenuItems}
                onLogout={handleLogout}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/restaurant/:restaurantId"
          element={<MenuList restaurants={restaurants} menuItems={menuItems} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
