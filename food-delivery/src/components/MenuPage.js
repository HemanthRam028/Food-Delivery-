// // import React from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';

// // const MenuPage = ({ restaurants = [], menuItems = [], cartItems, setCartItems }) => {
// //   const { id } = useParams(); // Get the restaurant ID from the URL
// //   const navigate = useNavigate();

// //   // Filter the menu items based on the restaurant ID
// //   const filteredMenuItems = menuItems.filter(item => item.restaurantId === id);

// //   // Function to add item to cart
// //   const handleAddToCart = (item) => {
// //     const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
// //     if (existingItem) {
// //       // If the item is already in the cart, increase the quantity
// //       setCartItems(cartItems.map(cartItem =>
// //         cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
// //       ));
// //     } else {
// //       // Add new item to the cart with a quantity of 1
// //       setCartItems([...cartItems, { ...item, quantity: 1 }]);
// //     }
// //     // Redirect to the cart page after adding to cart
// //     navigate('/cart');
// //   };

// //   // Find the restaurant based on the ID
// //   const restaurant = restaurants.find(restaurant => restaurant.id === id);

// //   return (
// //     <div>
// //       <h2>Menu for Restaurant {restaurant ? restaurant.name : 'Unknown'}</h2>
// //       <ul>
// //         {filteredMenuItems.length > 0 ? (
// //           filteredMenuItems.map(item => (
// //             <li key={item.id}>
// //               <img src={item.image} alt={item.name} className="menu-item-image" />
// //               {item.name} - ${item.price}
// //               <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
// //             </li>
// //           ))
// //         ) : (
// //           <li>No menu items available for this restaurant.</li>
// //         )}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default MenuPage;
// import React, { useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// const MenuPage = ({ fetchMenu, menuItems, cartItems, setCartItems }) => {
//   const { id } = useParams(); // Get the restaurantId from the URL

//   useEffect(() => {
//     fetchMenu(id); // Fetch menu for the selected restaurant when the component mounts
//   }, [id, fetchMenu]);

//   return (
//     <div>
//       <h2>Menu for Restaurant {id}</h2>
//       <div>
//         {menuItems.length > 0 ? (
//           menuItems.map((item) => (
//             <div key={item._id}>
//               <h3>{item.name}</h3>
//               <p>{item.description}</p>
//               <p>${item.price}</p>
//               <button
//                 onClick={() => {
//                   setCartItems([...cartItems, item]); // Add item to cart
//                 }}
//               >
//                 Add to Cart
//               </button>
//             </div>
//           ))
//         ) : (
//           <p>No menu items available.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MenuPage;

// import React, { useEffect, useState } from 'react';
// import { useParams, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import './MenuPage.css';

// const MenuPage = () => {
//   const { restaurantId } = useParams();
//   const location = useLocation();
//   const [menuItems, setMenuItems] = useState(location.state?.menuItems || []);
  
//   useEffect(() => {
//     if (!location.state?.menuItems) {
//       // Fetch menu items only if not passed through location state
//       const fetchMenuItems = async () => {
//         try {
//           const response = await axios.get(`http://localhost:5002/api/menu?restaurantId=${restaurantId}`);
//           setMenuItems(response.data);
//         } catch (error) {
//           console.error('Error fetching menu items:', error);
//         }
//       };
//       fetchMenuItems();
//     }
//   }, [restaurantId, location.state]);

//   return (
//     <div className="menu-page">
//       <h2>Menu for Restaurant {restaurantId}</h2>
//       <ul className="menu-list">
//         {menuItems.length > 0 ? (
//           menuItems.map((item) => (
//             <li key={item.id} className="menu-item">
//               <img src={item.image} alt={item.name} className="menu-image" />
//               <div className="menu-info">
//                 <h3>{item.name}</h3>
//                 <p>Price: ${item.price}</p>
//               </div>
//             </li>
//           ))
//         ) : (
//           <p>No menu items available for this restaurant.</p>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default MenuPage;

// import React, { useState, useEffect } from 'react';
// import { useParams, useLocation } from 'react-router-dom';
// import './MenuPage.css';

// const MenuPage = () => {
//   const { restaurantId } = useParams();
//   const location = useLocation();
//   const [menuItems, setMenuItems] = useState(location.state ? location.state.menuItems : []);

//   useEffect(() => {
//     if (location.state) {
//       setMenuItems(location.state.menuItems);
//     }
//   }, [location]);

//   return (
//     <div className="menu-page">
//       <h2>Menu for Restaurant {restaurantId}</h2>
//       <ul className="menu-list">
//         {menuItems.map((item) => (
//           <li key={item.id} className="menu-item">
//             <h3>{item.name}</h3>
//             <p>{item.description}</p>
//             <p>${item.price}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default MenuPage;






// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const MenuPage = () => {
//   const { restaurantId } = useParams();
//   const [menuItems, setMenuItems] = useState([]);

//   useEffect(() => {
//     const fetchMenu = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5002/api/menu/${restaurantId}`);
//         setMenuItems(response.data);
//       } catch (error) {
//         console.error('Error fetching menu:', error);
//       }
//     };

//     fetchMenu();
//   }, [restaurantId]);

//   return (
//     <div>
//       <h1>Menu</h1>
//       {menuItems.length > 0 ? (
//         menuItems.map(item => (
//           <div key={item._id}>
//             <h2>{item.name}</h2>
//             <p>Price: {item.price}/-</p>
//             <img src={item.image} alt={item.name} />
//           </div>
//         ))
//       ) : (
//         <p>No menu items found.</p>
//       )}
//     </div>
//   );
// };

// export default MenuPage;


// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const MenuPage = () => {
//   const { restaurantId } = useParams();
//   const [menuItems, setMenuItems] = useState([]);

//   useEffect(() => {
//     const fetchMenu = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5002/api/menu/${restaurantId}`);
//         setMenuItems(response.data);
//       } catch (error) {
//         console.error('Error fetching menu:', error);
//       }
//     };

//     fetchMenu();
//   }, [restaurantId]);

//   const handleAddToCart = async (item) => {
//     const userId = '12345'; // Dummy userId. Replace with actual userId if needed.

//     try {
//       await axios.post('http://localhost:5002/api/cart/add', {
//         uid,
//         item: {
//           menuItemId: item._id,
//           name: item.name,
//           price: item.price,
//           image: item.image,
//           quantity: 1,
//         },
//       });
//       alert(`${item.name} added to cart`);
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Menu</h1>
//       {menuItems.length > 0 ? (
//         menuItems.map((item) => (
//           <div key={item._id}>
//             <h2>{item.name}</h2>
//             <p>Price: {item.price}/-</p>
//             <img src={item.image} alt={item.name} />
//             <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
//           </div>
//         ))
//       ) : (
//         <p>No menu items found.</p>
//       )}
//     </div>
//   );
// };

// export default MenuPage;


// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const MenuPage = () => {
//   const { restaurantId } = useParams(); // Restaurant ID from URL params
//   const navigate = useNavigate(); // Hook to handle navigation
//   const [menuItems, setMenuItems] = useState([]);
//   const uid = localStorage.getItem('uid'); // Retrieve user ID from localStorage
//   const token = localStorage.getItem('token'); // Retrieve JWT token from localStorage

//   // Fetch menu items for the selected restaurant
//   useEffect(() => {
//     const fetchMenu = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5002/api/menu/${restaurantId}`,
//         );
//         setMenuItems(response.data); // Update state with fetched menu items
//       } catch (error) {
//         console.error('Error fetching menu:', error);
//       }
//     };

//     fetchMenu();
//   }, [restaurantId]);

//   // Add item to cart or update its quantity
//   const handleAddToCart = async (item) => {
//     try {
//       const response = await axios.post(
//         'http://localhost:5002/api/cart/add',
//         {
//           uid, // Pass user ID from localStorage
//           item: {
//             menuItemId: item._id,
//             name: item.name,
//             price: item.price,
//             image: item.image,
//             quantity: 1, // Default quantity is 1
//           },
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // Include JWT token in the headers
//           },
//         },
//       );

//       if (response.status === 200) {
//         alert(`${item.name} added to cart`);
//         navigate('/cart'); // Redirect to the Cart page after adding item
//       }
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//       if (error.response?.status === 401) {
//         alert('Access denied. Please log in again.');
//         navigate('/login'); // Redirect to login page if unauthorized
//       } else {
//         alert('Failed to add item to cart.');
//       }
//     }
//   };

//   return (
//     <div>
//       <h1>Menu</h1>
//       {menuItems.length > 0 ? (
//         menuItems.map((item) => (
//           <div key={item._id}>
//             <h2>{item.name}</h2>
//             <p>Price: {item.price}/-</p>
//             <img src={item.image} alt={item.name} />
//             <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
//           </div>
//         ))
//       ) : (
//         <p>No menu items found.</p>
//       )}
//     </div>
//   );
// };

// export default MenuPage;

// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const MenuPage = () => {
//   const { restaurantId } = useParams(); // Restaurant ID from URL params
//   const navigate = useNavigate(); // Hook to handle navigation
//   const [menuItems, setMenuItems] = useState([]); // State to hold menu items
//   const token = localStorage.getItem('token'); // Retrieve JWT token from localStorage

//   // Fetch menu items for the selected restaurant
//   useEffect(() => {
//     // Check if token exists in localStorage
//     if (!token) {
//       alert('You need to log in to view the menu');
//       navigate('/login'); // Redirect to login page if no token is found
//       return;
//     }

//     const fetchMenu = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5002/api/menu/${restaurantId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`, // Pass token in the Authorization header
//             },
//           }
//         );
//         setMenuItems(response.data); // Update state with fetched menu items
//       } catch (error) {
//         console.error('Error fetching menu:', error);
//         alert('Failed to load menu items. Please try again later.');
//       }
//     };

//     fetchMenu();
//   }, [restaurantId, token, navigate]); // Add dependencies to effect

//   // Add item to cart or update its quantity
//   const handleAddToCart = async (item) => {
//     const uid = localStorage.getItem('uid');
//     const token = localStorage.getItem('token');
  
//     // Check if the user is logged in
//     if (!token || !uid) {
//       alert('You need to log in to add items to the cart.');
//       navigate('/login');
//       return;
//     }
  
//     try {
//       // Make API call to add item to cart
//       const response = await axios.post(
//         'http://localhost:5002/api/cart/add',
//         {
//           uid,  // Include uid in request body
//           item: {
//             menuItemId: item._id,   // Ensure correct backend structure
//             name: item.name,
//             price: item.price,
//             image: item.image,
//             quantity: 1,
//           },
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
  
//       // Handle successful response
//       if (response.status === 200) {
//         alert(`${item.name} has been added to your cart!`);
//         navigate('/cart'); // Redirect to cart page
//       }
//     } catch (error) {
//       console.error('Error adding to cart:', error);
  
//       // Handle specific server responses
//       if (error.response) {
//         console.log('Server response:', error.response.data); 
//       }
  
//       if (error.response?.status === 401) {
//         alert('Access denied. Please log in again.');
//         navigate('/login');
//       } else if (error.response?.status === 403) {
//         alert('You do not have permission to perform this action.');
//       } else {
//         alert('Failed to add item to cart. Please try again.');
//       }
//     }
//   };
  
  
  

//   return (
//     <div>
//       <h1>Menu</h1>
//       {menuItems.length > 0 ? (
//         menuItems.map((item) => (
//           <div key={item._id} style={{ margin: '20px 0' }}>
//             <h2>{item.name}</h2>
//             <p>Price: {item.price}/-</p>
//             <img
//               src={item.image}
//               alt={item.name}
//               style={{ width: '150px', height: '150px', objectFit: 'cover' }}
//             />
//             <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
//           </div>
//         ))
//       ) : (
//         <p>No menu items found.</p>
//       )}
//     </div>
//   );
// };

// export default MenuPage;



import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MenuPage.css';


const MenuPage = () => {
  const { restaurantId } = useParams(); // Restaurant ID from URL params
  const navigate = useNavigate(); // Hook to handle navigation
  const [menuItems, setMenuItems] = useState([]); // State to hold menu items
  const token = localStorage.getItem('token'); // Retrieve JWT token from localStorage

  // Fetch menu items for the selected restaurant
  useEffect(() => {
    // Check if token exists in localStorage
    if (!token) {
      alert('You need to log in to view the menu');
      navigate('/login'); // Redirect to login page if no token is found
      return;
    }

    const fetchMenu = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5002/api/menu/${restaurantId}`, // Corrected URL with template literal
          {
            headers: {
              Authorization: `Bearer ${token}`, // Corrected token header
            },
          }
        );
        setMenuItems(response.data); // Update state with fetched menu items
      } catch (error) {
        console.error('Error fetching menu:', error);
        alert('Failed to load menu items. Please try again later.');
      }
    };

    fetchMenu();
  }, [restaurantId, token, navigate]); // Add dependencies to effect

  // Add item to cart or update its quantity
  const handleAddToCart = async (item) => {
    const uid = localStorage.getItem('uid');
    const token = localStorage.getItem('token');
  
    // Check if the user is logged in
    if (!token || !uid) {
      alert('You need to log in to add items to the cart.');
      navigate('/login');
      return;
    }
  
    try {
      // Make API call to add item to cart
      const response = await axios.post(
        'http://localhost:5002/api/cart/add', // Corrected URL
        {
          uid,  // Include uid in request body
          item: {
            menuItemId: item._id,   // Ensure correct backend structure
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: 1,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Corrected token header
          },
        }
      );
  
      // Handle successful response
      if (response.status === 200) {
        alert(`${item.name} has been added to your cart!`); // Fixed string interpolation
        navigate('/cart'); // Redirect to cart page
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
  
      // Handle specific server responses
      if (error.response) {
        console.log('Server response:', error.response.data); 
      }
  
      if (error.response?.status === 401) {
        alert('Access denied. Please log in again.');
        navigate('/login');
      } else if (error.response?.status === 403) {
        alert('You do not have permission to perform this action.');
      } else {
        alert('Failed to add item to cart. Please try again.');
      }
    }
  };

  return (
    <div>
      <h1>Menu</h1>
      {menuItems.length > 0 ? (
        menuItems.map((item) => (
          <div key={item._id} style={{ margin: '20px 0' }}>
            <h2>{item.name}</h2>
            <p>Price: {item.price}/-</p>
            <img
              src={item.image}
              alt={item.name}
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            />
            <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
          </div>
        ))
      ) : (
        <p>No menu items found.</p>
      )}
    </div>
  );
};

export default MenuPage;
