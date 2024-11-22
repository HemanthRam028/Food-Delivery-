// Cart.js
import React from 'react';

const Cart = ({ cartItems }) => {
  return (
    <div>
      <h2>Cart</h2>
      {cartItems.map((item, index) => (
        <div key={index}>
          <span>{item.name}</span> - <span>${item.price}</span>
          <button>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
