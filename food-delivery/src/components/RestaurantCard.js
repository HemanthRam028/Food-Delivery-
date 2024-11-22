import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Restautant.css';

const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();

  const handleViewMenuClick = () => {
    console.log(`Navigating to menu with ID: ${restaurant.id}`);
    navigate(`/menu/${restaurant.id}`);
  }

  return (
    <div className="restaurant-card">
      <h3>{restaurant.name}</h3>
      <p>{restaurant.description}</p>
      <img src={restaurant.image} alt={restaurant.name} />
      <p>Rating: {restaurant.rating}</p>
      <button onClick={handleViewMenuClick}>View Menu</button>

    </div>
  );
};

export default RestaurantCard;
