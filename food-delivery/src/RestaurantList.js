// RestaurantList.js
import React from 'react';

const restaurantData = [
  { id: 1, name: 'Pizza Place', description: 'Best pizza in town', image: 'placeholder.png' },
  { id: 2, name: 'Burger Hub', description: 'Juicy burgers', image: 'placeholder.png' },
];

const RestaurantList = ({ viewMenu }) => {
  return (
    <div>
      {restaurantData.map((restaurant) => (
        <div key={restaurant.id} className="restaurant-card">
          <img src={restaurant.image} alt={restaurant.name} />
          <h3>{restaurant.name}</h3>
          <p>{restaurant.description}</p>
          <button onClick={() => viewMenu(restaurant.id)}>View Menu</button>
        </div>
      ))}
    </div>
  );
};

export default RestaurantList;
