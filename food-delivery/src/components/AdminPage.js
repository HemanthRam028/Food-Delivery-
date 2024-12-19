// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import RestaurantList from './RestaurantList';
// import MenuList from './MenuList';
// import './AdminPage.css';
// import axios from 'axios';

// const AdminPage = ({ restaurants, setRestaurants, menuItems, setMenuItems, onLogout }) => {
//   const [newRestaurant, setNewRestaurant] = useState({
//     id: '',
//     name: '',
//     image: '',
//     description: '',
//     rating: '',
//   });

//   const [isEditing, setIsEditing] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [isEditingMenuItem, setIsEditingMenuItem] = useState(false);
//   const [editMenuItemId, setEditMenuItemId] = useState(null);
//   const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);

//   const [newMenuItem, setNewMenuItem] = useState({
//     id: '',
//     name: '',
//     price: '',
//     image: '',
//     restaurantId: '',
//   });

//   const navigate = useNavigate();

//   // Handle adding or updating restaurant
//   // AdminPage.js

//  const handleAddOrUpdateRestaurant = async () => {
//   if (isEditing) {
//     // Update restaurant
//     try {
//       const response = await axios.put(
//         `http://localhost:5002/api/restaurants/${newRestaurant._id}`, // Use `_id` for identifying the restaurant
//         newRestaurant
//       );

//       const updatedRestaurant = response.data;

//       // Update the local state with the updated restaurant
//       setRestaurants(
//         restaurants.map((restaurant) =>
//           restaurant._id === updatedRestaurant._id ? updatedRestaurant : restaurant
//         )
//       );

//       setIsEditing(false);
//     } catch (error) {
//       console.error('Error updating restaurant:', error);
//     }
//   } else {
//     // Add new restaurant
//     try {
//       const response = await axios.post('http://localhost:5002/api/restaurants', newRestaurant);
//       const addedRestaurant = response.data;

//       setRestaurants([...restaurants, addedRestaurant]);
//     } catch (error) {
//       console.error('Error adding restaurant:', error);
//     }
//   }

//   // Reset the form
//   setNewRestaurant({ id: '', name: '', image: '', description: '', rating: '' });
// };

  
  

//   // Handle adding or updating menu item
//   const handleAddOrUpdateMenuItem = () => {
//     if (isEditingMenuItem) {
//       const updatedMenuItems = menuItems.map((item) =>
//         item.id === editMenuItemId ? { ...newMenuItem, id: editMenuItemId } : item
//       );
//       setMenuItems(updatedMenuItems);
//       setIsEditingMenuItem(false);
//     } else {
//       const menuItemToAdd = { ...newMenuItem, id: Date.now().toString() };
//       setMenuItems([...menuItems, menuItemToAdd]);
//     }
//     setNewMenuItem({ id: '', name: '', price: '', image: '', restaurantId: selectedRestaurantId });
//   };

//   // Select a restaurant and navigate to its menu page
//   const handleSelectRestaurant = (id) => {
//     setSelectedRestaurantId(id); // Set selected restaurant ID
//     setNewMenuItem({ ...newMenuItem, restaurantId: id });
//   };

//   // Handle change for restaurant fields
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewRestaurant({ ...newRestaurant, [name]: value });
//   };

//   // Handle change for menu item fields
//   const handleMenuChange = (e) => {
//     const { name, value } = e.target;
//     setNewMenuItem({ ...newMenuItem, [name]: value });
//   };

//   // Edit restaurant
//   const handleEditRestaurant = (restaurant) => {
//     setNewRestaurant(restaurant);
//     setEditId(restaurant.id);
//     setIsEditing(true);
//   };

//   // Remove restaurant and its menu items
//   // Remove restaurant and its menu items
// const handleRemoveRestaurant = async (id) => {
//   if (!id) {
//     console.error('Restaurant ID is missing.');
//     return;
//   }

//   try {
//     await axios.delete(`http://localhost:5002/api/restaurants/${id}`);
//     setRestaurants(restaurants.filter((restaurant) => restaurant._id !== id));
//     setMenuItems(menuItems.filter((item) => item.restaurantId !== id));
//   } catch (error) {
//     console.error('Error deleting restaurant:', error);
//   }
// };





//   // Edit menu item
//   const handleEditMenuItem = (item) => {
//     setNewMenuItem(item);
//     setEditMenuItemId(item.id);
//     setIsEditingMenuItem(true);
//   };

//   // Remove menu item
//   const handleRemoveMenuItem = (id) => {
//     const updatedMenuItems = menuItems.filter((item) => item.id !== id);
//     setMenuItems(updatedMenuItems);
//   };

//   return (
//     <div className="admin-page">
//       <h2>Admin Panel</h2>
//       <button onClick={onLogout}>Logout</button>

//       <h3>{isEditing ? 'Edit Restaurant' : 'Add New Restaurant'}</h3>
//       <input
//         type="text"
//         name="name"
//         placeholder="Restaurant Name"
//         value={newRestaurant.name}
//         onChange={handleChange}
//       />
//       <input
//         type="text"
//         name="image"
//         placeholder="Restaurant Image URL"
//         value={newRestaurant.image}
//         onChange={handleChange}
//       />
//       <input
//         type="text"
//         name="description"
//         placeholder="Description"
//         value={newRestaurant.description}
//         onChange={handleChange}
//       />
//       <input
//         type="number"
//         name="rating"
//         placeholder="Rating"
//         value={newRestaurant.rating}
//         onChange={handleChange}
//       />
//       <button onClick={handleAddOrUpdateRestaurant}>
//         {isEditing ? 'Update Restaurant' : 'Add Restaurant'}
//       </button>

//       <h3>Current Restaurants</h3>
//       <div className="restaurant-grid">
//         {restaurants.length > 0 ? (
//           restaurants.map((restaurant) => (
//             <div className="restaurant-card" key={restaurant.id}>
//               <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
//               <div className="restaurant-info">
//                 <h4>{restaurant.name}</h4>
//                 <button onClick={() => handleEditRestaurant(restaurant)}>Edit</button>
//                 <button onClick={() => handleRemoveRestaurant(restaurant._id)}>Remove</button>
//                 <button onClick={() => handleSelectRestaurant(restaurant.id)}>View Menu</button>

//                 {selectedRestaurantId === restaurant.id && (
//                   <div className="menu-section">
//                     <h4>Menu for {restaurant.name}</h4>
//                     <ul>
//                       {menuItems.filter(item => item.restaurantId === restaurant.id).length > 0 ? (
//                         menuItems.filter(item => item.restaurantId === restaurant.id).map((item) => (
//                           <li key={item.id}>
//                             <img src={item.image} alt={item.name} className="menu-item-image" />
//                             {item.name} - ${item.price}
//                             <button onClick={() => handleEditMenuItem(item)}>Edit Menu Item</button>
//                             <button onClick={() => handleRemoveMenuItem(item.id)}>Remove Menu Item</button>
//                           </li>
//                         ))
//                       ) : (
//                         <li>No menu items available.</li>
//                       )}
//                     </ul>

//                     <h5>{isEditingMenuItem ? 'Edit Menu Item' : 'Add Menu Item'}</h5>
//                     <input
//                       type="text"
//                       name="name"
//                       placeholder="Menu Item Name"
//                       value={newMenuItem.name}
//                       onChange={handleMenuChange}
//                     />
//                     <input
//                       type="text"
//                       name="image"
//                       placeholder="Menu Item Image URL"
//                       value={newMenuItem.image}
//                       onChange={handleMenuChange}
//                     />
//                     <input
//                       type="number"
//                       name="price"
//                       placeholder="Price"
//                       value={newMenuItem.price}
//                       onChange={handleMenuChange}
//                     />
//                     <button onClick={handleAddOrUpdateMenuItem}>
//                       {isEditingMenuItem ? 'Update Menu Item' : 'Add Menu Item'}
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No restaurants available.</p>
//         )}
//       </div>

//       <RestaurantList
//         restaurants={restaurants}
//         setRestaurants={setRestaurants}
//       />
//       <MenuList
//         menuItems={menuItems}
//         setMenuItems={setMenuItems}
//         restaurantId={selectedRestaurantId}
//       />
//     </div>
//   );
// };

// export default AdminPage;


// import React, { useState, useEffect } from 'react';
// import './AdminPage.css';
// import axios from 'axios';

// const AdminPage = ({ restaurants, setRestaurants, menuItems, setMenuItems, onLogout }) => {
//   const [newRestaurant, setNewRestaurant] = useState({
//     id: '',
//     name: '',
//     image: '',
//     description: '',
//     rating: '',
//   });

//   const [isEditing, setIsEditing] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [isEditingMenuItem, setIsEditingMenuItem] = useState(false);
//   const [editMenuItemId, setEditMenuItemId] = useState(null);
//   const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);

//   const [newMenuItem, setNewMenuItem] = useState({
//     name: '',
//     price: '',
//     image: '',
//     restaurantId: '',
//   });

//   // Fetch the menu items for a specific restaurant when a restaurant is selected
//   useEffect(() => {
//     if (selectedRestaurantId) {
//       axios
//         .get(`http://localhost:5002/api/menu/${selectedRestaurantId}`)
//         .then((response) => {
//           setMenuItems(response.data); // Update menuItems state with fetched data
//         })
//         .catch((error) => {
//           console.error('Error fetching menu items:', error);
//         });
//     }
//   }, [selectedRestaurantId, setMenuItems]);

//   const handleAddOrUpdateRestaurant = async () => {
//     if (isEditing) {
//       try {
//         const response = await axios.put(
//           `http://localhost:5002/api/restaurants/${editId}`,
//           newRestaurant
//         );

//         setRestaurants(
//           restaurants.map((restaurant) =>
//             restaurant._id === editId ? response.data : restaurant
//           )
//         );
//         alert('Restaurant updated successfully!');
//       } catch (error) {
//         console.error('Error updating restaurant:', error);
//       }
//     } else {
//       try {
//         const response = await axios.post(
//           'http://localhost:5002/api/restaurants',
//           newRestaurant
//         );

//         setRestaurants([...restaurants, response.data]);
//         alert('Restaurant added successfully!');
//       } catch (error) {
//         console.error('Error adding restaurant:', error);
//       }
//     }

//     setNewRestaurant({ id: '', name: '', image: '', description: '', rating: '' });
//     setIsEditing(false);
//     setEditId(null);
//   };

//   const handleAddOrUpdateMenuItem = async () => {
//     const menuItemData = {
//       name: newMenuItem.name,
//       price: newMenuItem.price,
//       image: newMenuItem.image,
//       restaurantId: selectedRestaurantId,
//     };

//     try {
//       if (isEditingMenuItem) {
//         const response = await axios.put(
//           `http://localhost:5002/api/menu/edit/${editMenuItemId}`,
//           menuItemData
//         );

//         setMenuItems(
//           menuItems.map((item) =>
//             item._id === editMenuItemId ? response.data : item
//           )
//         );
//         alert('Menu item updated successfully!');
//       } else {
//         const response = await axios.post(
//           'http://localhost:5002/api/menu/add',
//           menuItemData
//         );

//         setMenuItems([...menuItems, response.data]);
//         alert('Menu item added successfully!');
//       }
//     } catch (error) {
//       console.error('Error adding or updating menu item:', error);
//     }

//     setNewMenuItem({ name: '', price: '', image: '', restaurantId: '' });
//     setIsEditingMenuItem(false);
//     setEditMenuItemId(null);
//   };

//   const handleSelectRestaurant = async (id) => {
//     setSelectedRestaurantId(id); // Set the selected restaurant ID

//     // Fetch menu items only if restaurant is selected
//     try {
//       const response = await axios.get(
//         `http://localhost:5002/api/menu/${id}`
//       );
//       setMenuItems(response.data); // Assuming the response contains menu items for the selected restaurant
//     } catch (error) {
//       console.error('Error fetching menu items:', error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewRestaurant({ ...newRestaurant, [name]: value });
//   };

//   const handleMenuChange = (e) => {
//     const { name, value } = e.target;
//     setNewMenuItem({ ...newMenuItem, [name]: value });
//   };

//   const handleEditRestaurant = (restaurant) => {
//     setNewRestaurant(restaurant);
//     setEditId(restaurant._id); // Corrected to _id
//     setIsEditing(true);
//   };

//   const handleRemoveRestaurant = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5002/api/restaurants/${id}`);
//       setRestaurants(restaurants.filter((restaurant) => restaurant._id !== id));
//       setMenuItems(menuItems.filter((item) => item.restaurantId !== id));
//       alert('Restaurant removed successfully!');
//     } catch (error) {
//       console.error('Error deleting restaurant:', error);
//     }
//   };

//   const handleEditMenuItem = (item) => {
//     setNewMenuItem(item);
//     setEditMenuItemId(item._id);
//     setIsEditingMenuItem(true);
//   };

//   const handleRemoveMenuItem = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5002/api/menu/delete/${id}`);
//       setMenuItems(menuItems.filter((item) => item._id !== id));
//       alert('Menu item removed successfully!');
//     } catch (error) {
//       console.error('Error deleting menu item:', error);
//     }
//   };

//   return (
//     <div className="admin-page">
//       <h2>Admin Panel</h2>
//       <button onClick={onLogout}>Logout</button>

//       <h3>{isEditing ? 'Edit Restaurant' : 'Add New Restaurant'}</h3>
//       <input
//         type="text"
//         name="name"
//         placeholder="Restaurant Name"
//         value={newRestaurant.name}
//         onChange={handleChange}
//       />
//       <input
//         type="text"
//         name="image"
//         placeholder="Restaurant Image URL"
//         value={newRestaurant.image}
//         onChange={handleChange}
//       />
//       <input
//         type="text"
//         name="description"
//         placeholder="Description"
//         value={newRestaurant.description}
//         onChange={handleChange}
//       />
//       <input
//         type="number"
//         name="rating"
//         placeholder="Rating"
//         value={newRestaurant.rating}
//         onChange={handleChange}
//       />
//       <button onClick={handleAddOrUpdateRestaurant}>
//         {isEditing ? 'Update Restaurant' : 'Add Restaurant'}
//       </button>

//       <h3>Current Restaurants</h3>
//       <div className="restaurant-grid">
//         {restaurants.map((restaurant) => (
//           <div className="restaurant-card" key={restaurant._id}>
//             <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
//             <div className="restaurant-info">
//               <h4>{restaurant.name}</h4>
//               <button onClick={() => handleEditRestaurant(restaurant)}>Edit</button>
//               <button onClick={() => handleRemoveRestaurant(restaurant._id)}>Remove</button>
//               <button onClick={() => handleSelectRestaurant(restaurant._id)}>View Menu</button>

//               {selectedRestaurantId === restaurant._id && (
//                 <div className="menu-section">
//                   <h4>Menu for {restaurant.name}</h4>
//                   <ul>
//                     {menuItems
//                       .filter((item) => item.restaurantId === restaurant._id)
//                       .map((item) => (
//                         <li key={item._id}>
//                           <img src={item.image} alt={item.name} className="menu-item-image" />
//                           {item.name} - {item.price}/-
//                           <button onClick={() => handleEditMenuItem(item)}>Edit Menu Item</button>
//                           <button onClick={() => handleRemoveMenuItem(item._id)}>Remove Menu Item</button>
//                         </li>
//                       ))}
//                   </ul>

//                   <h5>{isEditingMenuItem ? 'Edit Menu Item' : 'Add Menu Item'}</h5>
//                   <input
//                     type="text"
//                     name="name"
//                     placeholder="Menu Item Name"
//                     value={newMenuItem.name}
//                     onChange={handleMenuChange}
//                   />
//                   <input
//                     type="text"
//                     name="image"
//                     placeholder="Menu Item Image URL"
//                     value={newMenuItem.image}
//                     onChange={handleMenuChange}
//                   />
//                   <input
//                     type="number"
//                     name="price"
//                     placeholder="Price"
//                     value={newMenuItem.price}
//                     onChange={handleMenuChange}
//                   />
//                   <button onClick={handleAddOrUpdateMenuItem}>
//                     {isEditingMenuItem ? 'Update Menu Item' : 'Add Menu Item'}
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminPage;


import React, { useState, useEffect } from 'react';
import './AdminPage.css';
import axios from 'axios';

const AdminPage = ({ restaurants, setRestaurants, menuItems, setMenuItems, onLogout }) => {
  const [newRestaurant, setNewRestaurant] = useState({
    id: '',
    name: '',
    image: '',
    description: '',
    rating: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isEditingMenuItem, setIsEditingMenuItem] = useState(false);
  const [editMenuItemId, setEditMenuItemId] = useState(null);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);

  const [newMenuItem, setNewMenuItem] = useState({
    name: '',
    price: '',
    image: '',
    restaurantId: '',
  });

  // Fetch the menu items for a specific restaurant when a restaurant is selected
  useEffect(() => {
    if (selectedRestaurantId) {
      axios
        .get(`http://localhost:5002/api/menu/${selectedRestaurantId}`)
        .then((response) => {
          setMenuItems(response.data); // Update menuItems state with fetched data
        })
        .catch((error) => {
          console.error('Error fetching menu items:', error);
        });
    }
  }, [selectedRestaurantId, setMenuItems]);

  const handleAddOrUpdateRestaurant = async () => {
    if (!newRestaurant.name || !newRestaurant.image || !newRestaurant.description || !newRestaurant.rating) {
      alert('Please fill in all the restaurant details!');
      return;
    }

    if (isEditing) {
      try {
        const response = await axios.put(
          `http://localhost:5002/api/restaurants/${editId}`,
          newRestaurant
        );

        setRestaurants(
          restaurants.map((restaurant) =>
            restaurant._id === editId ? response.data : restaurant
          )
        );
        alert('Restaurant updated successfully!');
      } catch (error) {
        console.error('Error updating restaurant:', error);
      }
    } else {
      try {
        const response = await axios.post(
          'http://localhost:5002/api/restaurants',
          newRestaurant
        );

        setRestaurants([...restaurants, response.data]);
        alert('Restaurant added successfully!');
      } catch (error) {
        console.error('Error adding restaurant:', error);
      }
    }

    setNewRestaurant({ id: '', name: '', image: '', description: '', rating: '' });
    setIsEditing(false);
    setEditId(null);
  };

  const handleAddOrUpdateMenuItem = async () => {
    if (!newMenuItem.name || !newMenuItem.price || !newMenuItem.image) {
      alert('Please fill in all menu item details!');
      return;
    }

    const menuItemData = {
      name: newMenuItem.name,
      price: newMenuItem.price,
      image: newMenuItem.image,
      restaurantId: selectedRestaurantId,
    };

    try {
      if (isEditingMenuItem) {
        const response = await axios.put(
          `http://localhost:5002/api/menu/edit/${editMenuItemId}`,
          menuItemData
        );

        setMenuItems(
          menuItems.map((item) =>
            item._id === editMenuItemId ? response.data : item
          )
        );
        alert('Menu item updated successfully!');
      } else {
        const response = await axios.post(
          'http://localhost:5002/api/menu/add',
          menuItemData
        );

        setMenuItems([...menuItems, response.data]);
        alert('Menu item added successfully!');
      }
    } catch (error) {
      console.error('Error adding or updating menu item:', error);
    }

    setNewMenuItem({ name: '', price: '', image: '', restaurantId: '' });
    setIsEditingMenuItem(false);
    setEditMenuItemId(null);
  };

  const handleSelectRestaurant = async (id) => {
    setSelectedRestaurantId(id); // Set the selected restaurant ID

    // Fetch menu items only if restaurant is selected
    try {
      const response = await axios.get(
        `http://localhost:5002/api/menu/${id}`
      );
      setMenuItems(response.data); // Assuming the response contains menu items for the selected restaurant
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRestaurant({ ...newRestaurant, [name]: value });
  };

  const handleMenuChange = (e) => {
    const { name, value } = e.target;
    setNewMenuItem({ ...newMenuItem, [name]: value });
  };

  const handleEditRestaurant = (restaurant) => {
    setNewRestaurant(restaurant);
    setEditId(restaurant._id); // Corrected to _id
    setIsEditing(true);
  };

  const handleRemoveRestaurant = async (id) => {
    try {
      await axios.delete(`http://localhost:5002/api/restaurants/${id}`);
      setRestaurants(restaurants.filter((restaurant) => restaurant._id !== id));
      setMenuItems(menuItems.filter((item) => item.restaurantId !== id));
      alert('Restaurant removed successfully!');
    } catch (error) {
      console.error('Error deleting restaurant:', error);
    }
  };

  const handleEditMenuItem = (item) => {
    setNewMenuItem(item);
    setEditMenuItemId(item._id);
    setIsEditingMenuItem(true);
  };

  const handleRemoveMenuItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5002/api/menu/delete/${id}`);
      setMenuItems(menuItems.filter((item) => item._id !== id));
      alert('Menu item removed successfully!');
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

  return (
    <div className="admin-page">
      <h2>Admin Panel</h2>
      <button onClick={onLogout}>Logout</button>

      <h3>{isEditing ? 'Edit Restaurant' : 'Add New Restaurant'}</h3>
      <input
        type="text"
        name="name"
        placeholder="Restaurant Name"
        value={newRestaurant.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="image"
        placeholder="Restaurant Image URL"
        value={newRestaurant.image}
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={newRestaurant.description}
        onChange={handleChange}
      />
      <input
        type="number"
        name="rating"
        placeholder="Rating"
        value={newRestaurant.rating}
        onChange={handleChange}
      />
      <button onClick={handleAddOrUpdateRestaurant}>
        {isEditing ? 'Update Restaurant' : 'Add Restaurant'}
      </button>

      <h3>Current Restaurants</h3>
      <div className="restaurant-grid">
        {restaurants.map((restaurant) => (
          <div className="restaurant-card" key={restaurant._id}>
            <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
            <div className="restaurant-info">
              <h4>{restaurant.name}</h4>
              <button onClick={() => handleEditRestaurant(restaurant)}>Edit</button>
              <button onClick={() => handleRemoveRestaurant(restaurant._id)}>Remove</button>
              <button onClick={() => handleSelectRestaurant(restaurant._id)}>View Menu</button>

              {selectedRestaurantId === restaurant._id && (
                <div className="menu-section">
                  <h4>Menu for {restaurant.name}</h4>
                  <ul>
                    {menuItems
                      .filter((item) => item.restaurantId === restaurant._id)
                      .map((item) => (
                        <li key={item._id}>
                          <img src={item.image} alt={item.name} className="menu-item-image" />
                          {item.name} - {item.price}/-
                          <button onClick={() => handleEditMenuItem(item)}>Edit Menu Item</button>
                          <button onClick={() => handleRemoveMenuItem(item._id)}>Remove Menu Item</button>
                        </li>
                      ))}
                  </ul>

                  <h5>{isEditingMenuItem ? 'Edit Menu Item' : 'Add Menu Item'}</h5>
                  <input
                    type="text"
                    name="name"
                    placeholder="Menu Item Name"
                    value={newMenuItem.name}
                    onChange={handleMenuChange}
                  />
                  <input
                    type="text"
                    name="image"
                    placeholder="Menu Item Image URL"
                    value={newMenuItem.image}
                    onChange={handleMenuChange}
                  />
                  <input
                    type="number"
                    name="price"
                    placeholder="Menu Item Price"
                    value={newMenuItem.price}
                    onChange={handleMenuChange}
                  />
                  <button onClick={handleAddOrUpdateMenuItem}>
                    {isEditingMenuItem ? 'Update Menu Item' : 'Add Menu Item'}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './AdminPage.css';

// const AdminPage = ({ restaurants, setRestaurants, onLogout }) => {
//   const navigate = useNavigate();

//   const [newRestaurant, setNewRestaurant] = useState({
//     name: '',
//     image: '',
//     description: '',
//     rating: '',
//   });

//   const [isEditing, setIsEditing] = useState(false);
//   const [editId, setEditId] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewRestaurant((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleAddOrUpdateRestaurant = async () => {
//     if (isEditing) {
//       try {
//         const response = await axios.put(`http://localhost:5002/api/restaurants/${editId}`, newRestaurant);
//         const updatedRestaurant = response.data;
//         setRestaurants((prevRestaurants) =>
//           prevRestaurants.map((restaurant) =>
//             restaurant._id === updatedRestaurant._id ? updatedRestaurant : restaurant
//           )
//         );
//         setIsEditing(false);
//         setEditId(null);
//         setNewRestaurant({
//           name: '',
//           image: '',
//           description: '',
//           rating: '',
//         });
//       } catch (error) {
//         console.error('Error updating restaurant:', error);
//       }
//     } else {
//       try {
//         const response = await axios.post('http://localhost:5002/api/restaurants', newRestaurant);
//         const createdRestaurant = response.data;
//         setRestaurants((prevRestaurants) => [...prevRestaurants, createdRestaurant]);
//         setNewRestaurant({
//           name: '',
//           image: '',
//           description: '',
//           rating: '',
//         });
//       } catch (error) {
//         console.error('Error adding restaurant:', error);
//       }
//     }
//   };

//   const handleEditRestaurant = (restaurant) => {
//     setIsEditing(true);
//     setEditId(restaurant._id);
//     setNewRestaurant({
//       name: restaurant.name,
//       image: restaurant.image,
//       description: restaurant.description,
//       rating: restaurant.rating,
//     });
//   };

//   const handleRemoveRestaurant = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5002/api/restaurants/${id}`);
//       setRestaurants((prevRestaurants) => prevRestaurants.filter((restaurant) => restaurant._id !== id));
//     } catch (error) {
//       console.error('Error removing restaurant:', error);
//     }
//   };

//   const handleSelectRestaurant = (id) => {
//     // Navigate to the restaurant menu page
//     navigate(`/restaurant/${id}/menu`);
//   };

//   return (
//     <div className="admin-page">
//       <h2>Admin Panel</h2>
//       <button onClick={onLogout}>Logout</button>

//       <h3>{isEditing ? 'Edit Restaurant' : 'Add New Restaurant'}</h3>
//       <input
//         type="text"
//         name="name"
//         placeholder="Restaurant Name"
//         value={newRestaurant.name}
//         onChange={handleChange}
//       />
//       <input
//         type="text"
//         name="image"
//         placeholder="Image URL"
//         value={newRestaurant.image}
//         onChange={handleChange}
//       />
//       <textarea
//         name="description"
//         placeholder="Description"
//         value={newRestaurant.description}
//         onChange={handleChange}
//       />
//       <input
//         type="number"
//         name="rating"
//         placeholder="Rating (1-5)"
//         value={newRestaurant.rating}
//         onChange={handleChange}
//         min="1"
//         max="5"
//       />
//       <button onClick={handleAddOrUpdateRestaurant}>
//         {isEditing ? 'Update Restaurant' : 'Add Restaurant'}
//       </button>

//       <h3>Current Restaurants</h3>
//       <div className="restaurant-grid">
//         {restaurants.map((restaurant) => (
//           <div className="restaurant-card" key={restaurant._id}>
//             <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
//             <div className="restaurant-info">
//               <h4>{restaurant.name}</h4>
//               <button onClick={() => handleEditRestaurant(restaurant)}>Edit</button>
//               <button onClick={() => handleRemoveRestaurant(restaurant._id)}>Remove</button>
//               <button onClick={() => handleSelectRestaurant(restaurant._id)}>View Menu</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminPage;






// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import RestaurantList from './RestaurantList';
// import MenuList from './MenuList';
// import './AdminPage.css';

// const AdminPage = ({ restaurants, setRestaurants, menuItems, setMenuItems, onLogout }) => {
//   const [newRestaurant, setNewRestaurant] = useState({
//     id: '',
//     name: '',
//     image: '',
//     description: '',
//     rating: '',
//   });

//   const [isEditing, setIsEditing] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [isEditingMenuItem, setIsEditingMenuItem] = useState(false);
//   const [editMenuItemId, setEditMenuItemId] = useState(null);
//   const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);

//   const [newMenuItem, setNewMenuItem] = useState({
//     id: '',
//     name: '',
//     price: '',
//     image: '',
//     restaurantId: '',
//   });

//   const navigate = useNavigate();

//   // Handle adding or updating restaurant
//   const handleAddOrUpdateRestaurant = () => {
//     if (isEditing) {
//       const updatedRestaurants = restaurants.map((restaurant) =>
//         restaurant.id === editId ? { ...newRestaurant, id: editId } : restaurant
//       );
//       setRestaurants(updatedRestaurants);
//       setIsEditing(false);
//     } else {
//       const restaurantToAdd = { ...newRestaurant, id: Date.now().toString() };
//       setRestaurants([...restaurants, restaurantToAdd]);
//     }
//     setNewRestaurant({ id: '', name: '', image: '', description: '', rating: '' });
//   };

//   // Handle adding or updating menu item
//   const handleAddOrUpdateMenuItem = () => {
//     if (isEditingMenuItem) {
//       const updatedMenuItems = menuItems.map((item) =>
//         item.id === editMenuItemId ? { ...newMenuItem, id: editMenuItemId } : item
//       );
//       setMenuItems(updatedMenuItems);
//       setIsEditingMenuItem(false);
//     } else {
//       const menuItemToAdd = { ...newMenuItem, id: Date.now().toString() };
//       setMenuItems([...menuItems, menuItemToAdd]);
//     }
//     setNewMenuItem({ id: '', name: '', price: '', image: '', restaurantId: selectedRestaurantId });
//   };

//   // Select a restaurant and navigate to its menu page
//   const handleSelectRestaurant = (id) => {
//     setSelectedRestaurantId(id); // Set selected restaurant ID
//     setNewMenuItem({ ...newMenuItem, restaurantId: id });
//   };

//   // Handle change for restaurant fields
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewRestaurant({ ...newRestaurant, [name]: value });
//   };

//   // Handle change for menu item fields
//   const handleMenuChange = (e) => {
//     const { name, value } = e.target;
//     setNewMenuItem({ ...newMenuItem, [name]: value });
//   };

//   // Edit restaurant
//   const handleEditRestaurant = (restaurant) => {
//     setNewRestaurant(restaurant);
//     setEditId(restaurant.id);
//     setIsEditing(true);
//   };

//   // Remove restaurant and its menu items
//   const handleRemoveRestaurant = (id) => {
//     const updatedRestaurants = restaurants.filter((restaurant) => restaurant.id !== id);
//     setRestaurants(updatedRestaurants);
//     const updatedMenuItems = menuItems.filter((item) => item.restaurantId !== id);
//     setMenuItems(updatedMenuItems);
//   };

//   // Edit menu item
//   const handleEditMenuItem = (item) => {
//     setNewMenuItem(item);
//     setEditMenuItemId(item.id);
//     setIsEditingMenuItem(true);
//   };

//   // Remove menu item
//   const handleRemoveMenuItem = (id) => {
//     const updatedMenuItems = menuItems.filter((item) => item.id !== id);
//     setMenuItems(updatedMenuItems);
//   };

//   return (
//     <div className="admin-page">
//       <h2>Admin Panel</h2>
//       <button onClick={onLogout}>Logout</button>

//       <h3>{isEditing ? 'Edit Restaurant' : 'Add New Restaurant'}</h3>
//       <input
//         type="text"
//         name="name"
//         placeholder="Restaurant Name"
//         value={newRestaurant.name}
//         onChange={handleChange}
//       />
//       <input
//         type="text"
//         name="image"
//         placeholder="Restaurant Image URL"
//         value={newRestaurant.image}
//         onChange={handleChange}
//       />
//       <input
//         type="text"
//         name="description"
//         placeholder="Description"
//         value={newRestaurant.description}
//         onChange={handleChange}
//       />
//       <input
//         type="number"
//         name="rating"
//         placeholder="Rating"
//         value={newRestaurant.rating}
//         onChange={handleChange}
//       />
//       <button onClick={handleAddOrUpdateRestaurant}>
//         {isEditing ? 'Update Restaurant' : 'Add Restaurant'}
//       </button>

//       <h3>Current Restaurants</h3>
//       <div className="restaurant-grid">
//         {restaurants.length > 0 ? (
//           restaurants.map((restaurant) => (
//             <div className="restaurant-card" key={restaurant.id}>
//               <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
//               <div className="restaurant-info">
//                 <h4>{restaurant.name}</h4>
//                 <button onClick={() => handleEditRestaurant(restaurant)}>Edit</button>
//                 <button onClick={() => handleRemoveRestaurant(restaurant.id)}>Remove</button>
//                 <button onClick={() => handleSelectRestaurant(restaurant.id)}>View Menu</button>

//                 {selectedRestaurantId === restaurant.id && (
//                   <div className="menu-section">
//                     <h4>Menu for {restaurant.name}</h4>
//                     <ul>
//                       {menuItems.filter(item => item.restaurantId === restaurant.id).length > 0 ? (
//                         menuItems.filter(item => item.restaurantId === restaurant.id).map((item) => (
//                           <li key={item.id}>
//                             <img src={item.image} alt={item.name} className="menu-item-image" />
//                             {item.name} - ${item.price}
//                             <button onClick={() => handleEditMenuItem(item)}>Edit Menu Item</button>
//                             <button onClick={() => handleRemoveMenuItem(item.id)}>Remove Menu Item</button>
//                           </li>
//                         ))
//                       ) : (
//                         <li>No menu items available.</li>
//                       )}
//                     </ul>

//                     <h5>{isEditingMenuItem ? 'Edit Menu Item' : 'Add Menu Item'}</h5>
//                     <input
//                       type="text"
//                       name="name"
//                       placeholder="Menu Item Name"
//                       value={newMenuItem.name}
//                       onChange={handleMenuChange}
//                     />
//                     <input
//                       type="text"
//                       name="image"
//                       placeholder="Menu Item Image URL"
//                       value={newMenuItem.image}
//                       onChange={handleMenuChange}
//                     />
//                     <input
//                       type="number"
//                       name="price"
//                       placeholder="Price"
//                       value={newMenuItem.price}
//                       onChange={handleMenuChange}
//                     />
//                     <button onClick={handleAddOrUpdateMenuItem}>
//                       {isEditingMenuItem ? 'Update Menu Item' : 'Add Menu Item'}
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No restaurants available.</p>
//         )}
//       </div>

//       <RestaurantList
//         restaurants={restaurants}
//         setRestaurants={setRestaurants}
//       />
//       <MenuList
//         menuItems={menuItems}
//         setMenuItems={setMenuItems}
//         restaurantId={selectedRestaurantId}
//       />
//     </div>
//   );
// };

// export default AdminPage; 