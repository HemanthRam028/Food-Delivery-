import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RestaurantList from './RestaurantList';
import MenuList from './MenuList';
import './AdminPage.css';

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
    id: '',
    name: '',
    price: '',
    image: '',
    restaurantId: '',
  });

  const navigate = useNavigate();

  // Handle adding or updating restaurant
  const handleAddOrUpdateRestaurant = () => {
    if (isEditing) {
      const updatedRestaurants = restaurants.map((restaurant) =>
        restaurant.id === editId ? { ...newRestaurant, id: editId } : restaurant
      );
      setRestaurants(updatedRestaurants);
      setIsEditing(false);
    } else {
      const restaurantToAdd = { ...newRestaurant, id: Date.now().toString() };
      setRestaurants([...restaurants, restaurantToAdd]);
    }
    setNewRestaurant({ id: '', name: '', image: '', description: '', rating: '' });
  };

  // Handle adding or updating menu item
  const handleAddOrUpdateMenuItem = () => {
    if (isEditingMenuItem) {
      const updatedMenuItems = menuItems.map((item) =>
        item.id === editMenuItemId ? { ...newMenuItem, id: editMenuItemId } : item
      );
      setMenuItems(updatedMenuItems);
      setIsEditingMenuItem(false);
    } else {
      const menuItemToAdd = { ...newMenuItem, id: Date.now().toString() };
      setMenuItems([...menuItems, menuItemToAdd]);
    }
    setNewMenuItem({ id: '', name: '', price: '', image: '', restaurantId: selectedRestaurantId });
  };

  // Select a restaurant and navigate to its menu page
  const handleSelectRestaurant = (id) => {
    setSelectedRestaurantId(id); // Set selected restaurant ID
    setNewMenuItem({ ...newMenuItem, restaurantId: id });
  };

  // Handle change for restaurant fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRestaurant({ ...newRestaurant, [name]: value });
  };

  // Handle change for menu item fields
  const handleMenuChange = (e) => {
    const { name, value } = e.target;
    setNewMenuItem({ ...newMenuItem, [name]: value });
  };

  // Edit restaurant
  const handleEditRestaurant = (restaurant) => {
    setNewRestaurant(restaurant);
    setEditId(restaurant.id);
    setIsEditing(true);
  };

  // Remove restaurant and its menu items
  const handleRemoveRestaurant = (id) => {
    const updatedRestaurants = restaurants.filter((restaurant) => restaurant.id !== id);
    setRestaurants(updatedRestaurants);
    const updatedMenuItems = menuItems.filter((item) => item.restaurantId !== id);
    setMenuItems(updatedMenuItems);
  };

  // Edit menu item
  const handleEditMenuItem = (item) => {
    setNewMenuItem(item);
    setEditMenuItemId(item.id);
    setIsEditingMenuItem(true);
  };

  // Remove menu item
  const handleRemoveMenuItem = (id) => {
    const updatedMenuItems = menuItems.filter((item) => item.id !== id);
    setMenuItems(updatedMenuItems);
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
        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <div className="restaurant-card" key={restaurant.id}>
              <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
              <div className="restaurant-info">
                <h4>{restaurant.name}</h4>
                <button onClick={() => handleEditRestaurant(restaurant)}>Edit</button>
                <button onClick={() => handleRemoveRestaurant(restaurant.id)}>Remove</button>
                <button onClick={() => handleSelectRestaurant(restaurant.id)}>View Menu</button>

                {selectedRestaurantId === restaurant.id && (
                  <div className="menu-section">
                    <h4>Menu for {restaurant.name}</h4>
                    <ul>
                      {menuItems.filter(item => item.restaurantId === restaurant.id).length > 0 ? (
                        menuItems.filter(item => item.restaurantId === restaurant.id).map((item) => (
                          <li key={item.id}>
                            <img src={item.image} alt={item.name} className="menu-item-image" />
                            {item.name} - ${item.price}
                            <button onClick={() => handleEditMenuItem(item)}>Edit Menu Item</button>
                            <button onClick={() => handleRemoveMenuItem(item.id)}>Remove Menu Item</button>
                          </li>
                        ))
                      ) : (
                        <li>No menu items available.</li>
                      )}
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
                      placeholder="Price"
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
          ))
        ) : (
          <p>No restaurants available.</p>
        )}
      </div>

      <RestaurantList
        restaurants={restaurants}
        setRestaurants={setRestaurants}
      />
      <MenuList
        menuItems={menuItems}
        setMenuItems={setMenuItems}
        restaurantId={selectedRestaurantId}
      />
    </div>
  );
};

export default AdminPage;
