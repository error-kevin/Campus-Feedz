// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA4OAH4aeTWz6zBUFy3HL0xo1IxDUiO-7k", 
  authDomain: "campus-feedzz.firebaseapp.com",
  projectId: "campus-feedzz",
  storageBucket: "campus-feedzz.firebasestorage.app",
  messagingSenderId: "1029170227376",
  appId: "1:1029170227376:web:473213d03a7cb2effa3375",
  measurementId: "G-440TD7PKEH"
};

// Initialize
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };