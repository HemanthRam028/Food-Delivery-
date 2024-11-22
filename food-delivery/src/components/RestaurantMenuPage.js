import React from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

const RestaurantMenuPage = ({ restaurants, menuItems }) => {
  const { restaurantId } = useParams();
  const restaurant = restaurants.find((rest) => rest.id === restaurantId);
  const restaurantMenuItems = menuItems.filter((item) => item.restaurantId === restaurantId);

  if (!restaurant) {
    return <p>Restaurant not found.</p>;
  }

  return (
    <div>
      <h2>{restaurant.name}</h2>
      <img src={restaurant.image} alt={restaurant.name} />
      <p>{restaurant.description}</p>
      <p>Rating: {restaurant.rating}</p>

      <h3>Menu</h3>
      <ul>
        {restaurantMenuItems.length > 0 ? (
          restaurantMenuItems.map((menuItem) => (
            <li key={menuItem.id}>
              <img src={menuItem.image} alt={menuItem.name} />
              <div>{menuItem.name}</div>
              <div>Price: ${menuItem.price}</div>
            </li>
          ))
        ) : (
          <p>No menu items available.</p>
        )}
      </ul>
    </div>
  );
};

RestaurantMenuPage.propTypes = {
  restaurants: PropTypes.array.isRequired,
  menuItems: PropTypes.array.isRequired,
};

export default RestaurantMenuPage;
