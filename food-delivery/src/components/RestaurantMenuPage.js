// import React from 'react';
// import { useParams } from 'react-router-dom';
// import PropTypes from 'prop-types';

// const RestaurantMenuPage = ({ restaurants, menuItems }) => {
//   const { restaurantId } = useParams();
//   const restaurant = restaurants.find((rest) => rest.id === restaurantId);
//   const restaurantMenuItems = menuItems.filter((item) => item.restaurantId === restaurantId);

//   if (!restaurant) {
//     return <p>Restaurant not found.</p>;
//   }

//   return (
//     <div>
//       <h2>{restaurant.name}</h2>
//       <img src={restaurant.image} alt={restaurant.name} />
//       <p>{restaurant.description}</p>
//       <p>Rating: {restaurant.rating}</p>

//       <h3>Menu</h3>
//       <ul>
//         {restaurantMenuItems.length > 0 ? (
//           restaurantMenuItems.map((menuItem) => (
//             <li key={menuItem.id}>
//               <img src={menuItem.image} alt={menuItem.name} />
//               <div>{menuItem.name}</div>
//               <div>Price: ${menuItem.price}</div>
//             </li>
//           ))
//         ) : (
//           <p>No menu items available.</p>
//         )}
//       </ul>
//     </div>
//   );
// };

// RestaurantMenuPage.propTypes = {
//   restaurants: PropTypes.array.isRequired,
//   menuItems: PropTypes.array.isRequired,
// };

// export default RestaurantMenuPage;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom'; // Import useParams to get restaurantId

// const RestaurantMenuPage = () => {
//   const { restaurantId } = useParams(); // Get restaurantId from URL
//   const [menuItems, setMenuItems] = useState([]);
//   const [newMenuItem, setNewMenuItem] = useState({
//     name: '',
//     price: '',
//     image: '',
//   });
//   const [editingMenuItem, setEditingMenuItem] = useState(null);
//   const [error, setError] = useState('');

//   // Fetch menu items for the selected restaurant
//   useEffect(() => {
//     if (restaurantId) {
//       axios
//         .get(`http://localhost:5002/api/menu/${restaurantId}`)
//         .then((response) => {
//           setMenuItems(response.data);
//           setError(''); // Reset error if data is fetched successfully
//         })
//         .catch((error) => {
//           setError('Error fetching menu items.');
//           console.error('Error fetching menu items:', error);
//         });
//     }
//   }, [restaurantId]);

//   const handleMenuChange = (e) => {
//     const { name, value } = e.target;
//     setNewMenuItem({ ...newMenuItem, [name]: value });
//   };

//   const handleAddOrUpdateMenuItem = async () => {
//     if (!newMenuItem.name || !newMenuItem.price || !newMenuItem.image) {
//       alert('All fields are required.');
//       return;
//     }

//     if (isNaN(newMenuItem.price) || newMenuItem.price <= 0) {
//       alert('Please enter a valid price.');
//       return;
//     }

//     try {
//       let response;
//       if (editingMenuItem) {
//         // Update menu item
//         response = await axios.put(
//           `http://localhost:5002/api/menu/edit/${editingMenuItem._id}`,
//           { ...newMenuItem, restaurantId }
//         );
//         setMenuItems(
//           menuItems.map((item) =>
//             item._id === editingMenuItem._id ? response.data : item
//           )
//         );
//         alert('Menu item updated successfully!');
//       } else {
//         // Add new menu item
//         response = await axios.post(
//           'http://localhost:5002/api/menu/add',
//           { ...newMenuItem, restaurantId }
//         );
//         setMenuItems([...menuItems, response.data]);
//         alert('Menu item added successfully!');
//       }
//       setNewMenuItem({ name: '', price: '', image: '' });
//       setEditingMenuItem(null); // Reset editing state
//     } catch (error) {
//       console.error('Error adding or updating menu item:', error);
//     }
//   };

//   const handleRemoveMenuItem = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5002/api/menu/delete/${id}`);
//       setMenuItems(menuItems.filter((item) => item._id !== id));
//       alert('Menu item removed successfully!');
//       setNewMenuItem({ name: '', price: '', image: '' }); // Reset fields after deletion
//     } catch (error) {
//       console.error('Error removing menu item:', error);
//     }
//   };

//   const handleEditMenuItem = (item) => {
//     setNewMenuItem({ name: item.name, price: item.price, image: item.image });
//     setEditingMenuItem(item);
//   };

//   return (
//     <div className="restaurant-menu-page">
//       <h2>Menu for Restaurant</h2>
//       <h3>{editingMenuItem ? 'Edit Menu Item' : 'Add New Menu Item'}</h3>

//       {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}

//       <input
//         type="text"
//         name="name"
//         placeholder="Menu Item Name"
//         value={newMenuItem.name}
//         onChange={handleMenuChange}
//       />
//       <input
//         type="text"
//         name="image"
//         placeholder="Menu Item Image URL"
//         value={newMenuItem.image}
//         onChange={handleMenuChange}
//       />
//       <input
//         type="number"
//         name="price"
//         placeholder="Price"
//         value={newMenuItem.price}
//         onChange={handleMenuChange}
//       />
//       <button onClick={handleAddOrUpdateMenuItem}>
//         {editingMenuItem ? 'Update Menu Item' : 'Add Menu Item'}
//       </button>

//       <h3>Menu Items</h3>
//       <ul>
//         {menuItems.map((item) => (
//           <li key={item._id}>
//             <img src={item.image} alt={item.name} className="menu-item-image" />
//             {item.name} - ${item.price}
//             <button onClick={() => handleEditMenuItem(item)}>Edit</button>
//             <button onClick={() => handleRemoveMenuItem(item._id)}>Remove</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default RestaurantMenuPage;
