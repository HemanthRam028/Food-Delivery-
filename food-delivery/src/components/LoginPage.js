import React from 'react';
import './loginPage.css'; // Import the CSS for animation
import logo from './logo.png'; // Direct logo path

const LoginPage = ({ onLogin, onAdminLogin }) => {
  return (
    <section>
      <span></span><span></span><span></span><span></span><span></span>
      <div className="signin">
        <div className="text-box">
          <h2 className="glowing-text">WELCOME TO BHOJANA</h2>
          <img src={logo} alt="Logo" className="logo" />
          <div className="form">
            <button className="google-login-btn" onClick={onLogin}>
              User Login
            </button>
            <button className="admin-login-btn" onClick={onAdminLogin}>
              Admin Login
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
