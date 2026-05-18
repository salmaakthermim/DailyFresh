import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase/firebase';

const AuthContext = createContext(null);
const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const saveUserToDB = (user) => axios.post(`${API}/api/users`, {
  name: user.displayName || '',
  email: user.email,
  photoURL: user.photoURL || '',
}).catch(() => {});

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
      if (u) saveUserToDB(u);
    });
    return unsub;
  }, []);

  const register = async (name, email, password, photoURL = '') => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, {
      displayName: name,
      ...(photoURL ? { photoURL } : {}),
    });
    setUser({ ...cred.user, displayName: name, photoURL: photoURL || null });
    return cred.user;
  };

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const loginWithGoogle = () =>
    signInWithPopup(auth, googleProvider);

  const logout = () => signOut(auth);

  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  return (
    <AuthContext.Provider value={{ user, loading, register, login, loginWithGoogle, logout, resetPassword }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
