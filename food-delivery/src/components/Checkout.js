import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';


const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [userAddress, setUserAddress] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolder: '',
  });

  const uid = localStorage.getItem('uid');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // Fetch Cart Items
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`http://localhost:5002/api/cart/${uid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { cart } = response.data;
        setCartItems(cart || []);
        calculateTotal(cart || []);
      } catch (error) {
        console.error('Error fetching cart:', error);
        alert('Error fetching cart.');
      }
    };

    if (uid && token) {
      fetchCart();
    } else {
      navigate('/login');
    }
  }, [uid, token, navigate]);

  // Calculate Total Price
  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Payment
  const handlePayment = async () => {
    if (!userAddress.trim()) {
      alert('Please enter your address.');
      return;
    }
  
    if (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv || !cardDetails.cardHolder) {
      alert('Please fill in all card details.');
      return;
    }
  
    try {
      // Process Payment
      await axios.post(
        'http://localhost:5002/api/payment/process',
        {
          uid,
          cartItems,
          totalAmount: totalPrice,
          userAddress,
          cardDetails,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      // Clear Cart After Payment
      await axios.delete(`http://localhost:5002/api/cart/clear/${uid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      alert(`Order Amount: ₹${totalPrice}\nPayment Successful!`);
      navigate('/'); // Redirect to home page
    } catch (error) {
      console.error('Payment Error:', error);
      alert('Payment failed. Try again.');
    }
  };
  

  return (
    <div>
      <h1>Checkout</h1>
      <h3>Total Price: ₹{totalPrice.toFixed(2)}</h3>

      <label>
        Address:
        <input
          type="text"
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
          required
        />
      </label>

      <h3>Card Payment Details</h3>
      <label>Card Number:</label>
      <input
        type="text"
        name="cardNumber"
        value={cardDetails.cardNumber}
        onChange={handleInputChange}
        maxLength="16"
        required
      />

      <label>Expiry Date (MM/YY):</label>
      <input
        type="text"
        name="expiryDate"
        value={cardDetails.expiryDate}
        onChange={handleInputChange}
        required
      />

      <label>CVV:</label>
      <input
        type="password"
        name="cvv"
        value={cardDetails.cvv}
        onChange={handleInputChange}
        maxLength="3"
        required
      />

      <label>Card Holder Name:</label>
      <input
        type="text"
        name="cardHolder"
        value={cardDetails.cardHolder}
        onChange={handleInputChange}
        required
      />

      <button onClick={handlePayment}>Place Order</button>
    </div>
  );
};

export default Checkout;
