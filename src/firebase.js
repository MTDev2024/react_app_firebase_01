// Import des fonctions nécessaires depuis Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Configuration de l'application Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBW2hEKhLTjLZrHhNujvvMh-ZY9Z_15rmE",
  authDomain: "bdescooter-ba41e.firebaseapp.com",
  projectId: "bdescooter-ba41e",
  storageBucket: "bdescooter-ba41e.appspot.com", // Corrected bucket URL
  messagingSenderId: "584775805480",
  appId: "1:584775805480:web:6b365b6103531a3c93631d",
  measurementId: "G-WYM9P19LX5",
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// Initialisation des services Firebase
export const auth = getAuth(app); // Authentification
export const db = getFirestore(app); // Firestore
export const storage = getStorage(app); // Stockage
