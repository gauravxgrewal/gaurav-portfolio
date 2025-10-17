// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCSXuzvjXzDKq7KVTtzXMfO5NWixT0UtWA",
  authDomain: "g-project-db8a0.firebaseapp.com",
  databaseURL: "https://g-project-db8a0-default-rtdb.firebaseio.com",
  projectId: "g-project-db8a0",
  storageBucket: "g-project-db8a0.firebasestorage.app",
  messagingSenderId: "644885827724",
  appId: "1:644885827724:web:3d7ae0cf96f6044a24aba9"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;