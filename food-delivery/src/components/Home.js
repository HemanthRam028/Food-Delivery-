import React from 'react';
import Footer from './Footer';
import Header from './Header';
import UserPage from './UserPage';

const Home = ({ restaurants, menuItems }) => {
  return (
    <div>
      <Header restaurants={restaurants} menuItems={menuItems} />
      <UserPage restaurants={restaurants} menuItems={menuItems} />
      <Footer restaurants={restaurants} menuItems={menuItems} />
    </div>
  );
};

export default Home;
