// // UserPage.js
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './UserPage.css'; // Import the CSS file for styling

// const UserPage = ({ restaurants, menuItems }) => {
//   const navigate = useNavigate();

//   const handleViewMenu = (id) => {
//     navigate(`/menu/${id}`); // Redirect to MenuPage with restaurantId
//   };

//   return (
//     <div className="user-page">
//       <h2>Welcome to the Food Delivery App!</h2>
//       <h3>Restaurants</h3>
//       <div className="restaurant-list-container">
//         <ul className="restaurant-list">
//           {restaurants && restaurants.length > 0 ? (
//             restaurants.map((restaurant) => (
//               <li key={restaurant.id} className="restaurant-card">
//                 <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
//                 <div className="restaurant-info">
//                   <div className="restaurant-name">{restaurant.name}</div>
//                   <div className="restaurant-description">{restaurant.description}</div>
//                   <div className="restaurant-rating">Rating: {restaurant.rating}</div>
//                   <button className="view-menu-button" onClick={() => handleViewMenu(restaurant.id)}>
//                     View Menu
//                   </button>
//                 </div>
//               </li>
//             ))
//           ) : (
//             <li>No restaurants available.</li>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default UserPage;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './UserPage.css';

// const UserPage = ({ restaurants }) => {
//   const [menuData, setMenuData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const fetchMenu = async (restaurantId) => {
//     console.log('Fetching menu for restaurantId:', restaurantId); // Log the ID to check
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.get(`http://localhost:5002/api/menu?restaurant=${restaurantId}`);
//       if (response.data && response.data.length > 0) {
//         setMenuData(response.data);
//       } else {
//         setError('No menu items found.');
//       }
//     } catch (error) {
//       console.error('Error fetching menu:', error);
//       setError('Failed to fetch menu.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleViewMenu = (restaurantId) => {
//     fetchMenu(restaurantId);
//     navigate(`/menu/${restaurantId}`, {
//       state: { menuItems: menuData }  // Pass menuData to the MenuPage using state
//     });
//   };

//   return (
//     <div className="user-page">
//       <h2>Welcome to the Food Delivery App!</h2>
//       <h3>Restaurants</h3>
//       <div className="restaurant-list-container">
//         <ul className="restaurant-list">
//           {restaurants && restaurants.length > 0 ? (
//             restaurants.map((restaurant) => (
//               <li key={restaurant.id} className="restaurant-card">
//                 <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
//                 <div className="restaurant-info">
//                   <div className="restaurant-name">{restaurant.name}</div>
//                   <div className="restaurant-description">{restaurant.description}</div>
//                   <div className="restaurant-rating">Rating: {restaurant.rating}</div>
//                   <button
//                     className="view-menu-button"
//                     onClick={() => handleViewMenu(restaurant.id)}
//                   >
//                     View Menu
//                   </button>
//                 </div>
//               </li>
//             ))
//           ) : (
//             <li>No restaurants available.</li>
//           )}
//         </ul>
//       </div>

//       {loading && <div>Loading menu...</div>}
//       {error && <div className="error-message">{error}</div>}
//     </div>
//   );
// };

// export default UserPage;



// UserPage.jsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './UserPage.css';

// const UserPage = ({ restaurants }) => {
//   const [menuData, setMenuData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const fetchMenu = async (restaurantId) => {
//     console.log('Fetching menu for restaurantId:', restaurantId); // Log the ID to check
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.get(`http://localhost:5002/api/menu?restaurant=${restaurantId}`);
//       if (response.data && response.data.length > 0) {
//         setMenuData(response.data);
//       } else {
//         setError('No menu items found.');
//       }
//     } catch (error) {
//       console.error('Error fetching menu:', error);
//       setError('Failed to fetch menu.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleViewMenu = async (restaurantId) => {
//     await fetchMenu(restaurantId); // Fetch the menu first
//     if (menuData.length > 0) {
//       // Navigate only after menu data is available
//       navigate(`/menu/${restaurantId}`, {
//         state: { menuItems: menuData }  // Pass menuData to the MenuPage using state
//       });
//     }
//   };

//   return (
//     <div className="user-page">
//       <h2>Welcome to the Food Delivery App!</h2>
//       <h3>Restaurants</h3>
//       <div className="restaurant-list-container">
//         <ul className="restaurant-list">
//           {restaurants && restaurants.length > 0 ? (
//             restaurants.map((restaurant) => (
//               <li key={restaurant.id} className="restaurant-card">
//                 <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
//                 <div className="restaurant-info">
//                   <div className="restaurant-name">{restaurant.name}</div>
//                   <div className="restaurant-description">{restaurant.description}</div>
//                   <div className="restaurant-rating">Rating: {restaurant.rating}</div>
//                   <button
//                     className="view-menu-button"
//                     onClick={() => handleViewMenu(restaurant.id)}
//                   >
//                     View Menu
//                   </button>
//                 </div>
//               </li>
//             ))
//           ) : (
//             <li>No restaurants available.</li>
//           )}
//         </ul>
//       </div>

//       {loading && <div>Loading menu...</div>}
//       {error && <div className="error-message">{error}</div>}
//     </div>
//   );
// };

// export default UserPage;
// UserPage.js

import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './UserPage.css'; // Assuming you have this CSS file for styling

const UserPage = ({ restaurants }) => {
  const restaurantListRef = useRef(null);

  useEffect(() => {
    if (!restaurantListRef.current) return;

    // Initialize ResizeObserver to track size changes
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        console.log('Restaurant list height:', entry.contentRect.height);
      }
    });

    // Start observing the element
    observer.observe(restaurantListRef.current);

    // Cleanup on component unmount
    return () => observer.disconnect();
  }, [restaurants]); // Run effect when 'restaurants' changes

  return (
    <div className="user-page">
      <h2>Welcome to the Food Delivery App!</h2>
      <h3>Restaurants</h3>
      <div className="restaurant-list-container" ref={restaurantListRef}>
        <ul className="restaurant-list">
          {restaurants.map((restaurant) => (
            <li key={restaurant._id} className="restaurant-card">
              <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
              <div className="restaurant-info">
                <h4>{restaurant.name}</h4>
                <Link to={`/menu/${restaurant._id}`}>
                  <button>View Menu</button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserPage;
