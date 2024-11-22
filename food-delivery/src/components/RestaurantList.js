import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // For type validation
import axiosInstance from '../utils/axiosInstance';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axiosInstance.get('/restaurants');
        setRestaurants(response.data);
      } catch (err) {
        console.error('Error fetching restaurants:', err);
        setError('Failed to load restaurants. Please try again later.');
      }
    };

    fetchRestaurants();
  }, []);

  if (error) {
    return <p>{error}</p>; // Display error message
  }

  if (!Array.isArray(restaurants) || restaurants.length === 0) {
    return <p>No restaurants available.</p>; // Handle no data case
  }

  return (
    <div>
      <h1>Restaurants</h1>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant._id}>
            <img 
              src={restaurant.image || 'default-image-url.png'} // Provide a default image fallback
              alt={restaurant.name} 
              style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
            />
            <div>
              <h2>{restaurant.name}</h2>
              <p>{restaurant.location || 'Location not available'}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// PropTypes for validation
RestaurantList.propTypes = {
  restaurants: PropTypes.array, // Not required since restaurants are fetched
};

export default RestaurantList;
