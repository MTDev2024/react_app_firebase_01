//node uploadToFirestore.js



import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import trottinettes from "./trottinettes.js"; // Les données des trottinettes
import articles from "./articles.js"; // Les données des articles

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBW2hEKhLTjLZrHhNujvvMh-ZY9Z_15rmE",
  authDomain: "bdescooter-ba41e.firebaseapp.com",
  projectId: "bdescooter-ba41e",
  storageBucket: "bdescooter-ba41e.firebasestorage.app",
  messagingSenderId: "584775805480",
  appId: "1:584775805480:web:6b365b6103531a3c93631d",
  measurementId: "G-WYM9P19LX5",
};

// Initialiser Firebase et Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fonction pour uploader les trottinettes dans Firestore
async function uploadTrottinettes() {
  try {
    for (const trottinette of trottinettes) {
      const docRef = doc(db, "trottinettes", trottinette.itemID); // Document avec itemID comme identifiant
      await setDoc(docRef, trottinette); // Ajouter les données dans Firestore
      console.log(`Trottinette ajoutée : ${trottinette.itemID}`);
    }
    console.log("Toutes les trottinettes ont été importées avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'importation des trottinettes :", error);
  }
}

// Fonction pour uploader les articles dans Firestore
async function uploadArticles() {
  try {
    for (const article of articles) {
      const docRef = doc(db, "articles", article.id); // Document avec id comme identifiant
      await setDoc(docRef, article); // Ajouter les données dans Firestore
      console.log(`Article ajouté : ${article.id}`);
    }
    console.log("Tous les articles ont été importés avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'importation des articles :", error);
  }
}

// Appeler les deux fonctions pour uploader toutes les données
async function uploadData() {
  console.log("Début de l'importation des données...");
  await uploadTrottinettes();
  await uploadArticles();
  console.log("Importation terminée !");
}

// Lancer l'importation
uploadData();
