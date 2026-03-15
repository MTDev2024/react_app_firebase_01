// Import des fonctions nécessaires depuis Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Configuration de l'application Firebase
const firebaseConfig = {
<<<<<<< HEAD
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
=======
  apiKey: "AIzaSyBW2hEKhLTjLZrHhNujvvMh-ZY9Z_15rmE",
  authDomain: "bdescooter-ba41e.firebaseapp.com",
  projectId: "bdescooter-ba41e",
  storageBucket: "bdescooter-ba41e.firebasestorage.app", // Corrected bucket URL
  messagingSenderId: "584775805480",
  appId: "1:584775805480:web:6b365b6103531a3c93631d",
  measurementId: "G-WYM9P19LX5",
>>>>>>> 4159071f9053b7f5954fa76242f7e3b21367390c
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// Initialisation des services Firebase
export const auth = getAuth(app); // Authentification
export const db = getFirestore(app); // Firestore
export const storage = getStorage(app); // Stockage
