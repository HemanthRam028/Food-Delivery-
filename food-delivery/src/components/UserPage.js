// UserPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserPage.css'; // Import the CSS file for styling

const UserPage = ({ restaurants, menuItems }) => {
  const navigate = useNavigate();

  const handleViewMenu = (id) => {
    navigate(`/menu/${id}`); // Redirect to MenuPage with restaurantId
  };

  return (
    <div className="user-page">
      <h2>Welcome to the Food Delivery App!</h2>
      <h3>Restaurants</h3>
      <div className="restaurant-list-container">
        <ul className="restaurant-list">
          {restaurants && restaurants.length > 0 ? (
            restaurants.map((restaurant) => (
              <li key={restaurant.id} className="restaurant-card">
                <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
                <div className="restaurant-info">
                  <div className="restaurant-name">{restaurant.name}</div>
                  <div className="restaurant-description">{restaurant.description}</div>
                  <div className="restaurant-rating">Rating: {restaurant.rating}</div>
                  <button className="view-menu-button" onClick={() => handleViewMenu(restaurant.id)}>
                    View Menu
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li>No restaurants available.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default UserPage;
