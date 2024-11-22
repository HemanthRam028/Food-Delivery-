// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyALZiLGKbvbNz41rGbLtcB9edgsDl7cWhs",
  authDomain: "food-delivery-65199.firebaseapp.com",
  projectId: "food-delivery-65199",
  storageBucket: "food-delivery-65199.appspot.com",
  messagingSenderId: "449316124322",
  appId: "1:449316124322:web:3e1a8983f6db996e9a09fb",
  measurementId: "G-3LE6JRG5CC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Initialize Firestore
const db = getFirestore(app); // Initialize Firestore

// Export auth and Firestore
export { auth, provider, signInWithPopup, signOut, db }; // Export Firestore as db
