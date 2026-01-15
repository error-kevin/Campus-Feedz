import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider, db } from "../services/firebase.js"; 
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc, onSnapshot, serverTimestamp } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Login Function
   */
  const login = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const loggedInUser = result.user;

      const userRef = doc(db, "users", loggedInUser.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: loggedInUser.uid,
          displayName: loggedInUser.displayName,
          email: loggedInUser.email,
          photoURL: loggedInUser.photoURL,
          points: 0,               
          rank: "Freshman",         
          branch: "",               
          year: "",                 
          role: "student",          
          createdAt: serverTimestamp()
        });
        console.log("New user profile created!");
      }
      return result;
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
      throw error;
    }
  };

  const logout = () => signOut(auth);

  /**
   * Real-Time Observer: 
   * Listens for Auth changes AND live Firestore data changes (XP/Rank)
   */
  useEffect(() => {
    let unsubscribeSnapshot = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      // 1. Clear any existing Firestore listener if user logs out
      if (unsubscribeSnapshot) unsubscribeSnapshot();

      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);

        // 2. Set up a Real-Time Snapshot Listener
        unsubscribeSnapshot = onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists()) {
            // Merge Auth data with live Firestore data (Points, Rank, Branch)
            setUser({ ...currentUser, ...docSnap.data() });
          } else {
            setUser(currentUser);
          }
          setLoading(false);
        });
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    // Cleanup: Stop listening when component unmounts
    return () => {
      unsubscribeAuth();
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    };
  }, []);

  const value = { user, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);