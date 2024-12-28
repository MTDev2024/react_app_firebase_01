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
      slug: "choisir-trottinette-electrique",
      title: "Comment choisir une trottinette électrique",
      description: "Découvrez les critères pour choisir la meilleure trottinette.",
      content: "Voici un guide complet pour vous aider à faire le bon choix...",
      imageUrl: "https://example.com/trottinette.jpg",
      date: Timestamp.fromDate(new Date("2024-12-28")),
      tags: ["guide", "trottinette"],
      categories: ["Loisir", "Électrique"],
      featured: true,
      seoKeywords: ["trottinette", "guide", "électrique"],
      priority: 1,
    },
    {
      slug: "meilleures-trottinettes-enfants",
      title: "Les meilleures trottinettes pour enfants",
      description: "Une sélection des meilleures trottinettes adaptées aux enfants.",
      content: "Découvrez notre top 5 des trottinettes pour enfants, leur sécurité, et leurs avantages...",
      imageUrl: "https://example.com/trottinette-enfant.jpg",
      date: Timestamp.fromDate(new Date("2024-12-29")),
      tags: ["sécurité", "enfants"],
      categories: ["Famille", "Sécurité"],
      featured: false,
      seoKeywords: ["trottinette", "enfant", "sécurité"],
      priority: 2,
    },
  ];

  try {
    for (const article of testArticles) {
      try {
        const docRef = await addDoc(articlesRef, article);
        console.log(`Article ajouté avec ID ${docRef.id} : ${article.title}`);
      } catch (error) {
        console.error(
          `Erreur lors de l'ajout de l'article "${article.title}" :`,
          error
        );
      }
    }
  } catch (globalError) {
    console.error("Erreur générale lors de l'exécution du script :", globalError);
  }
};

addTestArticles();
