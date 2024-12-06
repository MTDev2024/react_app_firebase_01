import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import trottinettes from "./trottinettes.js"; // Ajoutez l'extension `.js` pour les modules ES

// Config Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBW2hEKhLTjLZrHhNujvvMh-ZY9Z_15rmE",
  authDomain: "bdescooter-ba41e.firebaseapp.com",
  projectId: "bdescooter-ba41e",
  storageBucket: "bdescooter-ba41e.firebasestorage.app",
  messagingSenderId: "584775805480",
  appId: "1:584775805480:web:6b365b6103531a3c93631d",
  measurementId: "G-WYM9P19LX5",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function uploadTrottinettes() {
  try {
    for (const trottinette of trottinettes) {
      const docRef = doc(db, "trottinettes", trottinette.itemID); // Crée un document avec itemID comme ID
      await setDoc(docRef, trottinette); // Envoie les données à Firestore
      console.log(`Trottinette ajoutée : ${trottinette.itemID}`);
    }
    console.log("Toutes les trottinettes ont été importées avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'importation :", error);
  }
}

uploadTrottinettes();
