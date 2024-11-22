import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <nav>
        <Link to="/contact">Contact Us</Link>
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/terms">Terms of Service</Link>
      </nav>

      <ul className="social-icon">
        <li className="social-icon__item">
          <a className="social-icon__link" href="https://www.facebook.com/hemanth.ram.9619" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
        </li>
        <li className="social-icon__item">
          <a className="social-icon__link" href="https://x.com/HemanthRam1431" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
        </li>
        <li className="social-icon__item">
          <a className="social-icon__link" href="https://www.linkedin.com/in/kalidindi-hemanth-ram-3ba851301/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </li>
        <li className="social-icon__item">
          <a className="social-icon__link" href="https://www.instagram.com/hemanthram064/?next=%2F" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </li>
      </ul>

      <p>&copy; 2024 Food Delivery App. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
