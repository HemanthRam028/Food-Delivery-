import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const MenuPage = ({ restaurants = [], menuItems = [], cartItems, setCartItems }) => {
  const { id } = useParams(); // Get the restaurant ID from the URL
  const navigate = useNavigate();

  // Filter the menu items based on the restaurant ID
  const filteredMenuItems = menuItems.filter(item => item.restaurantId === id);

  // Function to add item to cart
  const handleAddToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      // If the item is already in the cart, increase the quantity
      setCartItems(cartItems.map(cartItem =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      ));
    } else {
      // Add new item to the cart with a quantity of 1
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
    // Redirect to the cart page after adding to cart
    navigate('/cart');
  };

  // Find the restaurant based on the ID
  const restaurant = restaurants.find(restaurant => restaurant.id === id);

  return (
    <div>
      <h2>Menu for Restaurant {restaurant ? restaurant.name : 'Unknown'}</h2>
      <ul>
        {filteredMenuItems.length > 0 ? (
          filteredMenuItems.map(item => (
            <li key={item.id}>
              <img src={item.image} alt={item.name} className="menu-item-image" />
              {item.name} - ${item.price}
              <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
            </li>
          ))
        ) : (
          <li>No menu items available for this restaurant.</li>
        )}
      </ul>
    </div>
  );
};

export default MenuPage;
