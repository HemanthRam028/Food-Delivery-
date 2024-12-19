// import React, { useState, useEffect } from 'react';
// import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { auth, signInWithPopup, provider } from './components/firebase';
// import LoginPage from './components/LoginPage';
// import Home from './components/Home';
// import About from './components/About';
// import Privacy from './components/Privacy';
// import TermsOfService from './components/TermsOfService';
// import ContactUs from './components/ContactUs';
// import RestaurantList from './components/RestaurantList';
// import MenuPage from './components/MenuPage';
// import AdminPage from './components/AdminPage';
// import MenuList from './components/MenuList';
// import Cart from './components/Cart';
// import Checkout from './components/Checkout';
// import UserList from './components/UserList';

// const App = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [restaurants, setRestaurants] = useState([]);
//   const [menuItems, setMenuItems] = useState([]);
//   const [cartItems, setCartItems] = useState([]);
//   const navigate = useNavigate();

//   // Fetch Restaurants from Backend
//   const fetchRestaurants = async () => {
//     try {
//       const response = await axios.get('http://localhost:5002/api/restaurants');
//       setRestaurants(response.data); // Update state with fetched restaurants
//     } catch (error) {
//       console.error('Error fetching restaurants:', error);
//     }
//   };

  
//   // Fetch Menu for selected Restaurant
//   const fetchMenuItems = async (restaurantId) => {
//     try {
//       const response = await axios.get(`http://localhost:5002/api/menu/restaurant/${restaurantId}`);
//       setMenuItems(response.data);
//     } catch (error) {
//       console.error('Error fetching menu items:', error);
//     }
//   };

//   // Place Order
//   // const handlePlaceOrder = async () => {
//   //   const orderData = {
//   //     userId: user.uid, // Use user ID from authenticated user
//   //     items: cartItems,
//   //     address: 'User Address', // Replace with actual user address logic
//   //     cardDetails: {}, // Replace with actual card details logic
//   //   };

//   //   try {
//   //     const response = await axios.post('http://localhost:5000/order', orderData);
//   //     alert(response.data.message); // Show success message
//   //     setCartItems([]); // Clear cart after order is placed
//   //   } catch (error) {
//   //     console.error('Error placing order:', error);
//   //   }
//   // };

//   useEffect(() => {
//     fetchRestaurants(); // Fetch restaurants when component mounts

//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setUser(user);
//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
//     setCartItems(storedCartItems);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Store cart items in localStorage when it changes
//   }, [cartItems]);

//   const handleLogin = async () => {
//     try {
//       provider.setCustomParameters({ prompt: 'select_account' });
//       const result = await signInWithPopup(auth, provider);
//       const { uid, email, displayName, photoURL } = result.user;

//       // Save user details to the backend
//       await axios.post('http://localhost:5002/api/users/save-user', {
//         uid,
//         email,
//         name: displayName,
//         photoURL,
//       });

//       setUser(result.user); // Set user state in the frontend
//     } catch (error) {
//       console.error('Error during Google login:', error);
//     }
//   };

//   const handleAdminLogin = async () => {
//     try {
//       provider.setCustomParameters({ prompt: 'select_account' });
//       const result = await signInWithPopup(auth, provider);
//       const adminEmail = 'hemanthram064@gmail.com';
//       if (result.user.email === adminEmail) {
//         navigate('/admin');
//       } else {
//         alert('You must sign in with the authorized admin account.');
//         auth.signOut();
//       }
//     } catch (error) {
//       console.error('Error during admin login:', error);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await auth.signOut();
//       setUser(null);
//       navigate('/');
//     } catch (error) {
//       console.error('Error logging out:', error);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Routes>
//       <Route
//         path="/"
//         element={
//           !user ? (
//             <LoginPage onLogin={handleLogin} onAdminLogin={handleAdminLogin} />
//           ) : (
//             <Navigate to="/home" />
//           )
//         }
//       />
//       <Route
//         path="/home"
//         element={user ? <Home restaurants={restaurants} menuItems={menuItems} /> : <Navigate to="/" />}
//       />
//       <Route path="/about" element={<About />} />
//       <Route
//         path="/user-list"
//         element={
//           user ? <UserList /> : <Navigate to="/" />
//         }
//       />
//       <Route
//         path="/restaurant-list"
//         element={<RestaurantList restaurants={restaurants} />}
//       />
//       <Route path="/contact" element={<ContactUs />} />
//       <Route path="/privacy" element={<Privacy />} />
//       <Route path="/terms" element={<TermsOfService />} />
//       <Route
//         path="/checkout"
//         element={<Checkout cartItems={cartItems} setCartItems={setCartItems} />}
//       />
//       <Route
//         path="/menu/:id"
//         element={
//           <MenuPage
//             fetchMenu={fetchMenu}
//             restaurants={restaurants}
//             menuItems={menuItems}
//             cartItems={cartItems}
//             setCartItems={setCartItems}
//           />
//         }
//       />
//       <Route
//         path="/cart"
//         element={<Cart cartItems={cartItems} setCartItems={setCartItems} />}
//       />
//       <Route
//         path="/admin"
//         element={
//           user && user.email === 'hemanthram064@gmail.com' ? (
//             <AdminPage
//               restaurants={restaurants}
//               setRestaurants={setRestaurants}
//               menuItems={menuItems}
//               setMenuItems={setMenuItems}
//               onLogout={handleLogout}
//             />
//           ) : (
//             <Navigate to="/" />
//           )
//         }
//       />
//       <Route
//         path="/restaurant/:restaurantId"
//         element={<MenuList restaurants={restaurants} menuItems={menuItems} />}
//       />
//       <Route path="*" element={<Navigate to="/" />} />
//     </Routes>
//   );
// };

// import React, { useState, useEffect } from 'react';
// import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { auth, signInWithPopup, provider } from './components/firebase';
// import LoginPage from './components/LoginPage';
// import Home from './components/Home';
// import About from './components/About';
// import Privacy from './components/Privacy';
// import TermsOfService from './components/TermsOfService';
// import ContactUs from './components/ContactUs';
// import RestaurantList from './components/RestaurantList';
// import MenuPage from './components/MenuPage';
// import AdminPage from './components/AdminPage';
// import MenuList from './components/MenuList';
// import Cart from './components/Cart';
// import Checkout from './components/Checkout';
// import UserList from './components/UserList';
// import AuthProvider from './components/AuthContext';

// const App = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [restaurants, setRestaurants] = useState([]);
//   const [menuItems, setMenuItems] = useState([]);
//   const [cartItems, setCartItems] = useState([]);
//   const navigate = useNavigate();

//   // Fetch Restaurants
//   useEffect(() => {
//     const fetchRestaurants = async () => {
//       try {
//         const response = await axios.get('http://localhost:5002/api/restaurants');
//         setRestaurants(response.data);
//       } catch (error) {
//         console.error('Error fetching restaurants:', error);
//       }
//     };
//     fetchRestaurants();
//   }, []);

//   // Fetch Menu Items based on restaurantId
//   const fetchMenuItems = async (restaurantId) => {
//     try {
//       const response = await axios.get('http://localhost:5002/api/menu', {
//         params: { restaurantId },
//       });
      
//       setMenuItems(response.data);
//     } catch (error) {
//       console.error('Error fetching menu items:', error);
//     }
//   };

//   // Auth state listener
//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setUser(user);
//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, []);

//   // Cart state persistence
//   useEffect(() => {
//     const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
//     setCartItems(storedCartItems);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('cartItems', JSON.stringify(cartItems));
//   }, [cartItems]);

//   // Login and Admin Login Handlers
//   // const handleLogin = async () => {
//   //   try {
//   //     provider.setCustomParameters({ prompt: 'select_account' });
//   //     const result = await signInWithPopup(auth, provider);
//   //     await axios.post('http://localhost:5002/api/users/save-user', {
//   //       uid: result.user.uid,
//   //       email: result.user.email,
//   //       name: result.user.displayName,
//   //       photoURL: result.user.photoURL,
//   //     });
//   //     setUser(result.user);
//   //   } catch (error) {
//   //     console.error('Error during Google login:', error);
//   //   }
//   // };
  
//    const handleLogin = async () => {
//     try {
//       // Prompt for account selection
//       provider.setCustomParameters({ prompt: 'select_account' });

//       // Sign in with Google using Firebase
//       const result = await signInWithPopup(auth, provider);

//       // Retrieve the Firebase ID token
//       const token = await result.user.getIdToken();

//       // Store the token in localStorage
//       localStorage.setItem('token', token);
//       localStorage.setItem('uid', result.user.uid);

//       // Send the Firebase token to the server for verification
//       const response = await axios.post('http://localhost:5002/api/users/login', {
//         token,
//       });

//       // Store server-generated JWT token and user details
//       localStorage.setItem('serverToken', response.data.token);
//       localStorage.setItem('uid', response.data.uid);

//       // Navigate to Cart History page
//       navigate('/Cart');
//     } catch (error) {
//       console.error('Error during Google login:', error);
//       alert('Login failed. Please try again.');
//     }
//   };

//   const handleAdminLogin = async () => {
//     try {
//       provider.setCustomParameters({ prompt: 'select_account' });
//       const result = await signInWithPopup(auth, provider);
//       if (result.user.email === 'hemanthram064@gmail.com') {
//         navigate('/admin');
//       } else {
//         alert('You must sign in with the authorized admin account.');
//         await auth.signOut();
//       }
//     } catch (error) {
//       console.error('Error during admin login:', error);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await auth.signOut();
//       setUser(null);
//       navigate('/');
//     } catch (error) {
//       console.error('Error logging out:', error);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <AuthProvider>
//     <Routes>
//       <Route
//         path="/"
//         element={
//           !user ? (
//             <LoginPage onLogin={handleLogin} onAdminLogin={handleAdminLogin} />
//           ) : (
//             <Navigate to="/home" />
//           )
//         }
//       />
//       <Route
//         path="/home"
//         element={user ? <Home restaurants={restaurants} /> : <Navigate to="/" />}
//       />
//       <Route path="/about" element={<About />} />
//       <Route path="/privacy" element={<Privacy />} />
//       <Route path="/terms" element={<TermsOfService />} />
//       <Route path="/contact" element={<ContactUs />} />
//       <Route
//         path="/restaurant-list"
//         element={<RestaurantList restaurants={restaurants} />}
//       />
//       <Route
//           path="/menu/:restaurantId" // Added menuId in the route
//           element={
//             <MenuPage
//               fetchMenu={fetchMenuItems}
//               menuItems={menuItems}
//               cartItems={cartItems}
//               setCartItems={setCartItems}
//             />
//           }
//         />


//       {/* <Route
//         path="/cart"
//         element={<Cart cartItems={cartItems} setCartItems={setCartItems} />}
//       /> */}

//       <Route path="/cart" element={<Cart />} />
//       <Route
//         path="/checkout"
//         element={<Checkout cartItems={cartItems} setCartItems={setCartItems} />}
//       />
//       <Route
//         path="/admin"
//         element={
//           user && user.email === 'hemanthram064@gmail.com' ? (
//             <AdminPage
//               restaurants={restaurants}
//               setRestaurants={setRestaurants}
//               menuItems={menuItems}
//               setMenuItems={setMenuItems}
//               onLogout={handleLogout}
//             />
//           ) : (
//             <Navigate to="/" />
//           )
//         }
//       />
//       <Route
//         path="/user-list"
//         element={user ? <UserList /> : <Navigate to="/" />}
//       />
//       <Route
//         path="/restaurant/:restaurantId"
//         element={<MenuList restaurants={restaurants} menuItems={menuItems} />}
//       />
//       <Route path="*" element={<Navigate to="/" />} />
//     </Routes>
//     </AuthProvider>
//   );
// };

// export default App;



// import React, { useState, useEffect } from 'react';
// import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { auth, signInWithPopup, provider } from './components/firebase';
// import LoginPage from './components/LoginPage';
// import Home from './components/Home';
// import About from './components/About';
// import Privacy from './components/Privacy';
// import TermsOfService from './components/TermsOfService';
// import ContactUs from './components/ContactUs';
// import RestaurantList from './components/RestaurantList';
// import MenuPage from './components/MenuPage';
// import AdminPage from './components/AdminPage';
// import MenuList from './components/MenuList';
// import Cart from './components/Cart';
// import Checkout from './components/Checkout';
// import UserList from './components/UserList';
// import AuthProvider from './components/AuthContext';
// import History from './components/History';
// import RestaurantMenuPage from'./components/RestaurantMenuPage';


// const App = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [restaurants, setRestaurants] = useState([]);
//   const [menuItems, setMenuItems] = useState([]);
//   const [cartItems, setCartItems] = useState([]);
//   const navigate = useNavigate();

//   // Fetch Restaurants
//   useEffect(() => {
//     const fetchRestaurants = async () => {
//       try {
//         const response = await axios.get('http://localhost:5002/api/restaurants');
//         setRestaurants(response.data);
//       } catch (error) {
//         console.error('Error fetching restaurants:', error);
//       }
//     };
//     fetchRestaurants();
//   }, []);

//   // Fetch Menu Items by Restaurant
//   const fetchMenuItems = async (restaurantId) => {
//     try {
//       const response = await axios.get('http://localhost:5002/api/menu', {
//         params: { restaurantId },
//       });
//       setMenuItems(response.data);
//     } catch (error) {
//       console.error('Error fetching menu items:', error);
//     }
//   };

//   // Auth Listener
//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setUser(user);
//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, []);

//   // Persist Cart State
//   useEffect(() => {
//     const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
//     setCartItems(storedCartItems);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('cartItems', JSON.stringify(cartItems));
//   }, [cartItems]);

//   // User Login
//   const handleLogin = async () => {
//     try {
//       provider.setCustomParameters({ prompt: 'select_account' });
//       const result = await signInWithPopup(auth, provider);
//       const token = await result.user.getIdToken();
  
//       localStorage.setItem('token', token);
//       localStorage.setItem('uid', result.user.uid);
  
//       // Send the token to the backend to save the user info (optional step)
//       const response = await axios.post('http://localhost:5002/api/users/save-user', {
//         token,
//       });
  
//       // Save server response token (optional step)
//       localStorage.setItem('serverToken', response.data.token);
  
//       navigate('/home'); // Redirect to home after successful login
//     } catch (error) {
//       console.error('Login error:', error);
//       alert('Login failed. Please try again.');
//     }
//   };
  

//   // Admin Login
//   const handleAdminLogin = async () => {
//     try {
//       provider.setCustomParameters({ prompt: 'select_account' });
//       const result = await signInWithPopup(auth, provider);

//       if (result.user.email === 'hemanthram064@gmail.com') {
//         navigate('/admin');
//       } else {
//         alert('Sign in with the authorized admin account.');
//         await auth.signOut();
//       }
//     } catch (error) {
//       console.error('Admin login error:', error);
//     }
//   };

//   // Logout
//   const handleLogout = async () => {
//     try {
//       await auth.signOut();
//       setUser(null);
//       navigate('/');
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <AuthProvider>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             !user ? (
//               <LoginPage onLogin={handleLogin} onAdminLogin={handleAdminLogin} />
//             ) : (
//               <Navigate to="/home" />
//             )
//           }
//         />
//         <Route
//           path="/home"
//           element={user ? <Home restaurants={restaurants} /> : <Navigate to="/" />}
//         />
//         <Route path="/about" element={<About />} />
//         <Route path="/privacy" element={<Privacy />} />
//         <Route path="/terms" element={<TermsOfService />} />
//         <Route path="/contact" element={<ContactUs />} />

//         <Route
//           path="/restaurant-list"
//           element={<RestaurantList restaurants={restaurants} />}
//         />

//         <Route
//           path="/menu/:restaurantId"
//           element={
//             <MenuPage
//               fetchMenu={fetchMenuItems}
//               menuItems={menuItems}
//               cartItems={cartItems}
//               setCartItems={setCartItems}
//             />
//           }
//         />

//         <Route path="/Cart" element={<Cart />} />
//         <Route path="/history" element={<History />} />
//         <Route
//           path="/checkout"
//           element={<Checkout cartItems={cartItems} setCartItems={setCartItems} />}
//         />
//         <Route
//           path="/admin"
//           element={
//             user && user.email === 'hemanthram064@gmail.com' ? (
//               <AdminPage
//                 restaurants={restaurants}
//                 setRestaurants={setRestaurants}
//                 menuItems={menuItems}
//                 setMenuItems={setMenuItems}
//                 onLogout={handleLogout}
//               />
//             ) : (
//               <Navigate to="/" />
//             )
//           }
//         />
//         <Route
//           path="/user-list"
//           element={user ? <UserList /> : <Navigate to="/" />}
//         />
//         <Route
//           path="/restaurant/:restaurantId"
//           element={<MenuList restaurants={restaurants} menuItems={menuItems} />}
//         />
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </AuthProvider>
//   );
// };

// export default App;

import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { auth, signInWithPopup, provider } from './components/firebase';
import LoginPage from './components/LoginPage';
import Home from './components/Home';
import About from './components/About';
import Privacy from './components/Privacy';
import TermsOfService from './components/TermsOfService';
import ContactUs from './components/ContactUs';
import RestaurantList from './components/RestaurantList';
import MenuPage from './components/MenuPage';
import AdminPage from './components/AdminPage';
import MenuList from './components/MenuList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import UserList from './components/UserList';
import AuthProvider from './components/AuthContext';
import History from './components/History';
import RestaurantMenuPage from './components/RestaurantMenuPage';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Fetch Restaurants
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/restaurants');
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };
    fetchRestaurants();
  }, []);

  // Fetch Menu Items by Restaurant
  const fetchMenuItems = async (restaurantId) => {
    try {
      const response = await axios.get('http://localhost:5002/api/menu', {
        params: { restaurantId },
      });
      setMenuItems(response.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  // Auth Listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Persist Cart State
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // User Login
  const handleLogin = async () => {
    try {
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      localStorage.setItem('token', token);
      localStorage.setItem('uid', result.user.uid);

      // Send the token to the backend to save the user info (optional step)
      const response = await axios.post('http://localhost:5002/api/users/save-user', {
        token,
      });

      // Save server response token (optional step)
      localStorage.setItem('serverToken', response.data.token);

      navigate('/home'); // Redirect to home after successful login
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };

  // Admin Login
  const handleAdminLogin = async () => {
    try {
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, provider);

      if (result.user.email === 'hemanthram064@gmail.com') {
        navigate('/admin');
      } else {
        alert('Sign in with the authorized admin account.');
        await auth.signOut();
      }
    } catch (error) {
      console.error('Admin login error:', error);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            !user ? (
              <LoginPage onLogin={handleLogin} onAdminLogin={handleAdminLogin} />
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route
          path="/home"
          element={user ? <Home restaurants={restaurants} /> : <Navigate to="/" />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route
          path="/restaurant-list"
          element={<RestaurantList restaurants={restaurants} />}
        />
        <Route
          path="/menu/:restaurantId"
          element={
            <MenuPage
              fetchMenu={fetchMenuItems}
              menuItems={menuItems}
              cartItems={cartItems}
              setCartItems={setCartItems}
            />
          }
        />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/history" element={<History />} />
        <Route
          path="/checkout"
          element={<Checkout cartItems={cartItems} setCartItems={setCartItems} />}
        />
        <Route
          path="/admin"
          element={
            user && user.email === 'hemanthram064@gmail.com' ? (
              <AdminPage
                restaurants={restaurants}
                setRestaurants={setRestaurants}
                menuItems={menuItems}
                setMenuItems={setMenuItems}
                onLogout={handleLogout}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
          <Route path="/restaurant/:restaurantId/menu" component={RestaurantMenuPage}/>
        <Route
          path="/user-list"
          element={user ? <UserList /> : <Navigate to="/" />}
        />
        <Route
          path="/restaurant/:restaurantId"
          element={<MenuList restaurants={restaurants} menuItems={menuItems} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
