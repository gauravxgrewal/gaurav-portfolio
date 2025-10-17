// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Create the context
const AuthContext = createContext();

// Create the provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign up function
  const signup = async (email, password, name, phone) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    // Create a user document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      name: name,         // Added
      phone: phone,       // Added
      email: user.email,
      role: 'student', // Default role
      targetRounds: 0, // Default target
    });

    return res;
  };

  // Login function
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    return signOut(auth);
  };

  // Effect to manage auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, get their role from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setCurrentUser({
            ...user,
            ...userData, // Spread all user data from Firestore (role, name, phone, etc.)
          });
        } else {
          // Handle case where user exists in Auth but not Firestore
          console.error("No user document found in Firestore!");
          setCurrentUser(user); // Set user without role
        }
      } else {
        // User is signed out
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    signup,
    login,
    logout,
  };

  // Don't render children until loading is false
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};