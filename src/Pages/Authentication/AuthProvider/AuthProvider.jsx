import React, { useState, useEffect } from "react";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/init File/_firebase.init";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const googleProvider = new GoogleAuthProvider();

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const signInEmail = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const registerEmail = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };
  const updateUserProfile = ({ displayName, photoURL }) => {
    setLoading(true);
    return updateProfile(auth.currentUser, { displayName, photoURL });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const info = {
    user,
    loading,
    googleLogin,
    registerEmail,
    signInEmail,
    signOutUser,
    updateUserProfile,
  };

  return <AuthContext value={info}>{children}</AuthContext>;
};

export default AuthProvider;
