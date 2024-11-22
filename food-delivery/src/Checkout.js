// Checkout.js
import React, { useState } from 'react';

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    paymentMethod: 'credit-card',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Order placed:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name: </label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Address: </label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} required />
      </div>
      <div>
        <label>Payment Method: </label>
        <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
          <option value="credit-card">Credit Card</option>
          <option value="paypal">PayPal</option>
        </select>
      </div>
      <button type="submit">Place Order</button>
    </form>
  );
};

export default Checkout;
