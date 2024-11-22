// Menu.js
import React from 'react';

const menuData = {
  1: [
    { id: 101, name: 'Pepperoni Pizza', price: 12, image: 'placeholder.png' },
    { id: 102, name: 'Margarita Pizza', price: 10, image: 'placeholder.png' },
  ],
  2: [
    { id: 201, name: 'Cheeseburger', price: 8, image: 'placeholder.png' },
    { id: 202, name: 'Veggie Burger', price: 7, image: 'placeholder.png' },
  ],
};

const Menu = ({ restaurantId, addToCart }) => {
  const menuItems = menuData[restaurantId] || [];

  return (
    <div>
      {menuItems.map((item) => (
        <div key={item.id} className="menu-item">
          <img src={item.image} alt={item.name} />
          <h4>{item.name}</h4>
          <p>Price: ${item.price}</p>
          <button onClick={() => addToCart(item)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default Menu;
