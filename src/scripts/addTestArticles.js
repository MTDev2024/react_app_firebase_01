import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";

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

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Ajouter des articles de test
const addTestArticles = async () => {
  const articlesRef = collection(db, "articles");

  const testArticles = [
    {
      id: "article-001",
      title: "Les meilleures trottinettes pour 2024",
      description: "Découvrez notre sélection des meilleurs modèles de l'année.",
      image: "/assets/images/trottinette-001.jpg",
      tags: "comparatif",
      date: Timestamp.fromDate(new Date()),
    },
    {
      id: "article-002",
      title: "Guide d'entretien des trottinettes",
      description: "Apprenez à prolonger la durée de vie de votre trottinette.",
      image: "/assets/images/trottinette-002.jpg",
      tags: "entretien",
      date: Timestamp.fromDate(new Date()),
    },
    {
      id: "article-003",
      title: "Pourquoi choisir une trottinette électrique ?",
      description: "Les avantages de la mobilité douce pour tous.",
      image: "/assets/images/trottinette-003.jpg",
      tags: "avantages",
      date: Timestamp.fromDate(new Date()),
    },
  ];

  for (const article of testArticles) {
    await addDoc(articlesRef, article);
    console.log(`Article ajouté : ${article.title}`);
  }
};

addTestArticles().catch((error) => console.error("Erreur lors de l'ajout des articles :", error));
