// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const Cart = ({ cartItems, setCartItems }) => {
//   const navigate = useNavigate();

//   const handleIncreaseQuantity = (id) => {
//     setCartItems(prevItems =>
//       prevItems.map(item =>
//         item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//       )
//     );
//   };

//   const handleDecreaseQuantity = (id) => {
//     setCartItems(prevItems =>
//       prevItems.map(item =>
//         item.id === id && item.quantity > 1
//           ? { ...item, quantity: item.quantity - 1 }
//           : item
//       )
//     );
//   };

//   const handleRemoveItem = (id) => {
//     setCartItems(prevItems => prevItems.filter(item => item.id !== id));
//   };

//   const handleProceedToCheckout = () => {
//     if (cartItems.length > 0) {
//       navigate('/checkout');
//     } else {
//       alert('Your cart is empty!');
//     }
//   };

//   return (
//     <div className="cart">
//       <h3>Your Cart</h3>
//       <ul>
//         {cartItems.length > 0 ? (
//           cartItems.map(item => (
//             <li key={item.id}>
//               <img src={item.image} alt={item.name} style={{ width: '50px', height: 'auto' }} />
//               {item.name} - ${item.price} x {item.quantity}
//               <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
//               <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
//               <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
//             </li>
//           ))
//         ) : (
//           <li>No items in cart.</li>
//         )}
//       </ul>
//       {cartItems.length > 0 && (
//         <button onClick={handleProceedToCheckout}>Proceed to Checkout</button>
//       )}
//     </div>
//   );
// };

// export default Cart;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [userData, setUserData] = useState(null);

//   const uid = localStorage.getItem('uid'); // User ID
//   const token = localStorage.getItem('token'); // JWT token

//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5002/api/cart/${uid}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const cart = response.data;
//         setCartItems(cart.items || []);
//         calculateTotal(cart.items || []);
//       } catch (error) {
//         console.error('Error fetching cart:', error);
//       }
//     };

//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get('http://localhost:5002/api/cart/user', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUserData(response.data);
//         console.log('User Data:', response.data);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchCart();
//     fetchUserData();
//   }, [uid, token]);

//   const calculateTotal = (items) => {
//     const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
//     setTotalPrice(total);
//   };

//   const handleAddQuantity = async (menuItemId) => {
//     updateCart(menuItemId, 1);
//   };

//   const handleReduceQuantity = async (menuItemId) => {
//     updateCart(menuItemId, -1);
//   };

//   const handleRemoveItem = async (menuItemId) => {
//     try {
//       await axios.delete(`http://localhost:5002/api/cart/${uid}/${menuItemId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const updatedItems = cartItems.filter(item => item.menuItemId !== menuItemId);
//       setCartItems(updatedItems);
//       calculateTotal(updatedItems);
//     } catch (error) {
//       console.error('Error removing item:', error);
//     }
//   };

//   const updateCart = async (menuItemId, quantityChange) => {
//     try {
//       const updatedCart = cartItems.map((item) =>
//         item.menuItemId === menuItemId
//           ? { ...item, quantity: item.quantity + quantityChange }
//           : item
//       );

//       const updatedCartItems = updatedCart.filter(item => item.quantity > 0);

//       await axios.put(`http://localhost:5002/api/cart/${uid}`, { items: updatedCartItems }, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCartItems(updatedCartItems);
//       calculateTotal(updatedCartItems);
//     } catch (error) {
//       console.error('Error updating cart:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Your Cart</h1>
//       {cartItems.length > 0 ? (
//         cartItems.map((item) => (
//           <div key={item.menuItemId} className="cart-item">
//             <h3>{item.name}</h3>
//             <p>Price: ${item.price}</p>
//             <p>Quantity: {item.quantity}</p>
//             <button onClick={() => handleAddQuantity(item.menuItemId)}>Increase Quantity</button>
//             <button onClick={() => handleReduceQuantity(item.menuItemId)}>Decrease Quantity</button>
//             <button onClick={() => handleRemoveItem(item.menuItemId)}>Remove</button>
//           </div>
//         ))
//       ) : (
//         <p>Your cart is empty.</p>
//       )}
//       <h3>Total Price: ${totalPrice}</h3>
//     </div>
//   );
// };

// export default Cart;

// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const Cart = ({ cartItems, setCartItems }) => {
//   const navigate = useNavigate();

//   const handleIncreaseQuantity = (id) => {
//     setCartItems(prevItems =>
//       prevItems.map(item =>
//         item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//       )
//     );
//   };

//   const handleDecreaseQuantity = (id) => {
//     setCartItems(prevItems =>
//       prevItems.map(item =>
//         item.id === id && item.quantity > 1
//           ? { ...item, quantity: item.quantity - 1 }
//           : item
//       )
//     );
//   };

//   const handleRemoveItem = (id) => {
//     setCartItems(prevItems => prevItems.filter(item => item.id !== id));
//   };

//   const handleProceedToCheckout = () => {
//     if (cartItems.length > 0) {
//       navigate('/checkout');
//     } else {
//       alert('Your cart is empty!');
//     }
//   };

//   return (
//     <div className="cart">
//       <h3>Your Cart</h3>
//       <ul>
//         {cartItems.length > 0 ? (
//           cartItems.map(item => (
//             <li key={item.id}>
//               <img src={item.image} alt={item.name} style={{ width: '50px', height: 'auto' }} />
//               {item.name} - ${item.price} x {item.quantity}
//               <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
//               <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
//               <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
//             </li>
//           ))
//         ) : (
//           <li>No items in cart.</li>
//         )}
//       </ul>
//       {cartItems.length > 0 && (
//         <button onClick={handleProceedToCheckout}>Proceed to Checkout</button>
//       )}
//     </div>
//   );
// };

// export default Cart;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [userData, setUserData] = useState(null);

//   const uid = localStorage.getItem('uid'); // User ID
//   const token = localStorage.getItem('token'); // JWT token

//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5002/api/cart/${uid}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const cart = response.data;
//         setCartItems(cart.items || []);
//         calculateTotal(cart.items || []);
//       } catch (error) {
//         console.error('Error fetching cart:', error);
//       }
//     };

//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get('http://localhost:5002/api/cart/user', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUserData(response.data);
//         console.log('User Data:', response.data);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchCart();
//     fetchUserData();
//   }, [uid, token]);

//   const calculateTotal = (items) => {
//     const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
//     setTotalPrice(total);
//   };

//   const handleAddQuantity = async (menuItemId) => {
//     updateCart(menuItemId, 1);
//   };

//   const handleReduceQuantity = async (menuItemId) => {
//     updateCart(menuItemId, -1);
//   };

//   const handleRemoveItem = async (menuItemId) => {
//     try {
//       await axios.delete(`http://localhost:5002/api/cart/${uid}/${menuItemId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const updatedItems = cartItems.filter(item => item.menuItemId !== menuItemId);
//       setCartItems(updatedItems);
//       calculateTotal(updatedItems);
//     } catch (error) {
//       console.error('Error removing item:', error);
//     }
//   };

//   const updateCart = async (menuItemId, quantityChange) => {
//     try {
//       const updatedCart = cartItems.map((item) =>
//         item.menuItemId === menuItemId
//           ? { ...item, quantity: item.quantity + quantityChange }
//           : item
//       );

//       const updatedCartItems = updatedCart.filter(item => item.quantity > 0);

//       await axios.put(`http://localhost:5002/api/cart/${uid}`, { items: updatedCartItems }, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCartItems(updatedCartItems);
//       calculateTotal(updatedCartItems);
//     } catch (error) {
//       console.error('Error updating cart:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Your Cart</h1>
//       {cartItems.length > 0 ? (
//         cartItems.map((item) => (
//           <div key={item.menuItemId} className="cart-item">
//             <h3>{item.name}</h3>
//             <p>Price: ${item.price}</p>
//             <p>Quantity: {item.quantity}</p>
//             <button onClick={() => handleAddQuantity(item.menuItemId)}>Increase Quantity</button>
//             <button onClick={() => handleReduceQuantity(item.menuItemId)}>Decrease Quantity</button>
//             <button onClick={() => handleRemoveItem(item.menuItemId)}>Remove</button>
//           </div>
//         ))
//       ) : (
//         <p>Your cart is empty.</p>
//       )}
//       <h3>Total Price: ${totalPrice}</h3>
//     </div>
//   );
// };

// export default Cart;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Cart.css'

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const uid = localStorage.getItem('uid');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // Fetch current cart items
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
      alert('Error fetching cart data.');
    }
  };

  // Calculate total price
  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  // Update cart item quantity
  const updateCart = async (menuItemId, quantityChange) => {
    try {
      const updatedCart = cartItems.map((item) =>
        item.menuItemId === menuItemId
          ? { ...item, quantity: Math.max(item.quantity + quantityChange, 0) } // Ensure quantity doesn't go negative
          : item
      );

      const updatedCartItems = updatedCart.filter((item) => item.quantity > 0); // Remove items with quantity 0

      await axios.put(
        `http://localhost:5002/api/cart/${uid}`,
        { items: updatedCartItems },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCartItems(updatedCartItems);
      calculateTotal(updatedCartItems);
    } catch (error) {
      console.error('Error updating cart:', error);
      alert('Error updating cart.');
    }
  };

  const handleAddQuantity = (menuItemId) => updateCart(menuItemId, 1);
  const handleReduceQuantity = (menuItemId) => updateCart(menuItemId, -1);

  // Remove item from cart
  const handleRemoveItem = async (menuItemId) => {
    try {
      await axios.delete(
        `http://localhost:5002/api/cart/remove/${uid}/${menuItemId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedItems = cartItems.filter((item) => item.menuItemId !== menuItemId);
      setCartItems(updatedItems);
      calculateTotal(updatedItems);
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Error removing item from cart.');
    }
  };

  const handleProceedPayment = () => navigate('/checkout');
  const handleViewHistory = () => navigate('/history');

  useEffect(() => {
    if (uid && token) {
      fetchCart();
    } else {
      navigate('/login'); // Redirect if user is not logged in
    }
  }, [uid, token, navigate]);

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item.menuItemId} className="cart-item">
            <h3>{item.name}</h3>
            <p>Price: {item.price}/-</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => handleAddQuantity(item.menuItemId)}>Increase Quantity</button>
            <button onClick={() => handleReduceQuantity(item.menuItemId)}>Decrease Quantity</button>
            <button onClick={() => handleRemoveItem(item.menuItemId)}>Remove</button>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
      <h3>Total Price: {totalPrice.toFixed(2)}/-</h3>

      <button onClick={handleProceedPayment}>Proceed to Payment</button>
      <button onClick={handleViewHistory}>View Order History</button>
    </div>
  );
};

export default Cart;

