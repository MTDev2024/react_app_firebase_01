import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase"; // Firebase centralisé
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Card from "../components/Card.jsx"; // Composant Card pour les trottinettes
import ArticleCard from "../components/ArticleCard.jsx"; // Composant ArticleCard pour les articles

export default function Favorites() {
  const [user, setUser] = useState(null); // Utilisateur connecté
  const [favoriteScooters, setFavoriteScooters] = useState([]); // Détails des trottinettes favorites
  const [favoriteArticles, setFavoriteArticles] = useState([]); // Détails des articles favoris
  const [loading, setLoading] = useState(true); // État de chargement
  const [error, setError] = useState(null); // État des erreurs

  // Vérifier l'état de connexion de l'utilisateur
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        console.log("Utilisateur connecté :", currentUser);
        setUser(currentUser);
        await loadFavorites(currentUser.uid); // Charger les favoris
      } else {
        console.log("Aucun utilisateur connecté.");
        setUser(null);
        setFavoriteScooters([]);
        setFavoriteArticles([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // Charger les favoris depuis les sous-collections
  const loadFavorites = async (userId) => {
    setLoading(true);
    setError(null);
    console.log("Chargement des favoris pour l'utilisateur ID :", userId);

    try {
      // Charger les trottinettes favorites
      const scooterSnapshot = await getDocs(collection(db, "users", userId, "favoritesTrottinettes"));
      const scooterDetails = scooterSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      // Charger les articles favoris
      const articleSnapshot = await getDocs(collection(db, "users", userId, "favoritesArticles"));
      const articleDetails = articleSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      setFavoriteScooters(scooterDetails);
      setFavoriteArticles(articleDetails);

      console.log("Trottinettes favorites récupérées :", scooterDetails);
      console.log("Articles favoris récupérés :", articleDetails);
    } catch (error) {
      console.error("Erreur lors de la récupération des favoris :", error);
      setError("Impossible de charger vos favoris. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  // Affichage de l'état de chargement
  if (loading) {
    return <p className="text-center text-blue-500 font-bold mt-10">Chargement des favoris...</p>;
  }

  // Affichage des erreurs
  if (error) {
    return <p className="text-center text-red-600 font-bold mt-10">{error}</p>;
  }

  // Affichage pour utilisateur non connecté
  if (!user) {
    return <p className="text-center text-red-600 font-bold mt-10">Veuillez vous connecter pour voir vos favoris.</p>;
  }

  // Affichage des favoris
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-bold m-6 text-blue-800 text-center">Mes Favoris</h2>

      {/* Trottinettes favorites */}
      <div>
        <h3 className="text-2xl font-bold mb-4">Trottinettes favorites</h3>
        {favoriteScooters.length === 0 ? (
          <p className="text-center text-gray-600 font-bold mt-4">Aucune trottinette favorite pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {favoriteScooters.map((scooter) => (
              <Card
                key={scooter.id}
                trottinette={scooter}
                isSelected={false}
                onSelect={() => {}}
                disableSelect={true}
              />
            ))}
          </div>
        )}
      </div>

      {/* Articles favoris */}
      <div className="mt-10">
        <h3 className="text-2xl font-bold mb-4">Articles favoris</h3>
        {favoriteArticles.length === 0 ? (
          <p className="text-center text-gray-600 font-bold mt-4">Aucun article favori pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {favoriteArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
