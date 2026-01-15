import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyA4OAH4aeTWz6zBUFy3HL0xo1IxDUiO-7k", 
  authDomain: "campus-feedzz.firebaseapp.com",
  projectId: "campus-feedzz",
  storageBucket: "campus-feedzz.firebasestorage.app",
  messagingSenderId: "1029170227376",
  appId: "1:1029170227376:web:473213d03a7cb2effa3375",
  measurementId: "G-440TD7PKEH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services for use in other files
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
