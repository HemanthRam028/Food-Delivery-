import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './components/AuthProvider'; // Import the AuthProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>  {/* Wrap App with AuthProvider */}
      <Router>
        <App />
      </Router>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
