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
  const [filters, setFilters] = useState({
    price: null,
    puissance: null,
    autonomie: null,
    marque: [],
  });

  // Vérifier l'état de connexion de l'utilisateur
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await loadFavorites(currentUser.uid); // Charger les favoris
      } else {
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

    try {
      const scooterSnapshot = await getDocs(
        collection(db, "users", userId, "favoritesTrottinettes")
      );
      const scooterDetails = scooterSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const articleSnapshot = await getDocs(
        collection(db, "users", userId, "favoritesArticles")
      );
      const articleDetails = articleSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setFavoriteScooters(scooterDetails);
      setFavoriteArticles(articleDetails);
    } catch (error) {
      setError("Impossible de charger vos favoris. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  // Gestion des filtres
  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };

  // Filtrage des trottinettes favorites
  const filteredScooters = favoriteScooters.filter((scooter) => {
    const priceMatch = filters.price === null || scooter.prix <= filters.price;
    const puissanceMatch =
      filters.puissance === null ||
      scooter.puissance_moteur >= filters.puissance;
    const autonomieMatch =
      filters.autonomie === null ||
      scooter.distance_max >= filters.autonomie;
    const marqueMatch =
      filters.marque.length === 0 || filters.marque.includes(scooter.marque);

    return priceMatch && puissanceMatch && autonomieMatch && marqueMatch;
  });

  // Affichage des favoris
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-bold m-6 text-blue-800 text-center">Mes Favoris</h2>

      {/* Filtres */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block font-bold mb-2">Prix maximal (€)</label>
          <input
            type="number"
            value={filters.price || ""}
            onChange={(e) => handleFilterChange("price", Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block font-bold mb-2">Puissance minimale (W)</label>
          <input
            type="number"
            value={filters.puissance || ""}
            onChange={(e) =>
              handleFilterChange("puissance", Number(e.target.value))
            }
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block font-bold mb-2">Autonomie minimale (km)</label>
          <input
            type="number"
            value={filters.autonomie || ""}
            onChange={(e) =>
              handleFilterChange("autonomie", Number(e.target.value))
            }
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block font-bold mb-2">Marque</label>
          <select
            multiple
            value={filters.marque}
            onChange={(e) =>
              handleFilterChange(
                "marque",
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            {[...new Set(favoriteScooters.map((scooter) => scooter.marque))]
              .sort()
              .map((marque) => (
                <option key={marque} value={marque}>
                  {marque}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Trottinettes favorites */}
      <div>
        <h3 className="text-2xl font-bold mb-4">Trottinettes favorites</h3>
        {filteredScooters.length === 0 ? (
          <p className="text-center text-gray-600 font-bold mt-4">
            Aucune trottinette favorite correspondant aux filtres.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredScooters.map((scooter) => (
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
          <p className="text-center text-gray-600 font-bold mt-4">
            Aucun article favori pour le moment.
          </p>
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
