import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();

  const handleIncreaseQuantity = (id) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (id) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleProceedToCheckout = () => {
    if (cartItems.length > 0) {
      navigate('/checkout');
    } else {
      alert('Your cart is empty!');
    }
  };

  return (
    <div className="cart">
      <h3>Your Cart</h3>
      <ul>
        {cartItems.length > 0 ? (
          cartItems.map(item => (
            <li key={item.id}>
              <img src={item.image} alt={item.name} style={{ width: '50px', height: 'auto' }} />
              {item.name} - ${item.price} x {item.quantity}
              <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
              <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
              <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
            </li>
          ))
        ) : (
          <li>No items in cart.</li>
        )}
      </ul>
      {cartItems.length > 0 && (
        <button onClick={handleProceedToCheckout}>Proceed to Checkout</button>
      )}
    </div>
  );
};

export default Cart;
