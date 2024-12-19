// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const OrderHistory = () => {
//   const [cartHistory, setCartHistory] = useState([]);
//   const [paymentHistory, setPaymentHistory] = useState([]);
//   const uid = localStorage.getItem('uid');
//   const token = localStorage.getItem('token');

//   // Fetch cart history
//   const fetchCartHistory = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5002/api/cart/history/${uid}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setCartHistory(response.data);
//     } catch (error) {
//       console.error('Error fetching cart history:', error);
//     }
//   };

//   // Fetch payment history
//   const fetchPaymentHistory = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5002/api/payment/history/${uid}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setPaymentHistory(response.data);
//     } catch (error) {
//       console.error('Error fetching payment history:', error);
//     }
//   };

//   useEffect(() => {
//     if (uid && token) {
//       fetchCartHistory();
//       fetchPaymentHistory();
//     }
//   }, [uid, token]);

//   return (
//     <div>
//       <h1>Order and Payment History</h1>

//       <h2>Cart History</h2>
//       {cartHistory.length > 0 ? (
//         cartHistory.map((order, index) => (
//           <div key={order._id} className="order-history-item">
//             <h3>Order {index + 1}</h3>
//             <p>
//               <strong>Order Date:</strong>{' '}
//               {order.orderDate
//                 ? new Date(order.orderDate).toLocaleDateString()
//                 : 'Date Not Available'}{' '}
//               |{' '}
//               <strong>Time:</strong>{' '}
//               {order.orderDate
//                 ? new Date(order.orderDate).toLocaleTimeString([], {
//                     hour: '2-digit',
//                     minute: '2-digit',
//                     second: '2-digit',
//                   })
//                 : 'Time Not Available'}
//             </p>
//             <h4>Items:</h4>
//             <ul>
//               {order.items.map((item) => (
//                 <li key={item.menuItemId}>
//                   <strong>{item.name}</strong> - {item.quantity} x ₹
//                   {item.price.toFixed(2)}
//                 </li>
//               ))}
//             </ul>
//             <hr />
//           </div>
//         ))
//       ) : (
//         <p>No previous orders found.</p>
//       )}

//       <h2>Payment History</h2>
//       {paymentHistory.length > 0 ? (
//         paymentHistory.map((order, index) => (
//           <div key={order._id} className="payment-history-item">
//             <h3>Order {index + 1}</h3>
//             <p>
//               <strong>Order ID:</strong> {order.orderId}
//             </p>
//             <p>
//               <strong>Amount Paid:</strong> ₹{order.amount.toFixed(2)}
//             </p>
//             <p>
//               <strong>Payment Status:</strong> {order.status}
//             </p>
//             <p>
//               <strong>Order Date:</strong>{' '}
//               {new Date(order.createdAt).toLocaleDateString()}
//             </p>
//             <hr />
//           </div>
//         ))
//       ) : (
//         <p>No payment history found.</p>
//       )}
//     </div>
//   );
// };

// export default OrderHistory;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './History.css'; // Make sure the path is correct


const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const uid = localStorage.getItem('uid');
  const token = localStorage.getItem('token');

  const fetchOrderHistory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5002/api/payment/history/${uid}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrderHistory(response.data);
    } catch (error) {
      console.error('Error fetching order history:', error);
    }
  };

  useEffect(() => {
    if (uid && token) {
      fetchOrderHistory();
    }
  }, [uid, token]);

  return (
    <div>
      <h1>Order History</h1>
      {orderHistory.length > 0 ? (
        orderHistory.map((order, index) => (
          <div key={order._id} className="order-history-item">
            <h3>Order {index + 1}</h3>
            <p><strong>Order Date:</strong> {new Date(order.paymentDate).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {new Date(order.paymentDate).toLocaleTimeString()}</p>
            <h4>Items:</h4>
            <ul>
              {order.cartItems.map((item) => (
                <li key={item.menuItemId}>
                  <strong>{item.name}</strong> - {item.quantity} x ₹{item.price.toFixed(2)}
                </li>
              ))}
            </ul>
            <p><strong>Total Amount Paid:</strong> ₹{order.totalAmount.toFixed(2)}</p>
            <p><strong>Shipping Address:</strong> {order.userAddress}</p>
            <hr />
          </div>
        ))
      ) : (
        <p>No previous orders found.</p>
      )}
    </div>
  );
};

export default OrderHistory;
