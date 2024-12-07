import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase"; // Firebase centralisé
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Card from "../components/Card.jsx"; // Import du composant Card

export default function Favorites() {
  const [user, setUser] = useState(null); // Utilisateur connecté
  const [favoriteIDs, setFavoriteIDs] = useState([]); // IDs des trottinettes favorites
  const [favoriteScooters, setFavoriteScooters] = useState([]); // Détails des trottinettes favorites
  const [loading, setLoading] = useState(true); // État de chargement
  const [error, setError] = useState(null); // État des erreurs

  // Récupérer l'utilisateur connecté et ses favoris
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const userRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const favorites = userDoc.data().favoritesTrottinettes || [];
            setFavoriteIDs(favorites);
            console.log("Favoris récupérés :", favorites);
          } else {
            console.warn("Document utilisateur non trouvé.");
            setFavoriteIDs([]);
          }
        } catch (error) {
          console.error("Erreur lors de la récupération des favoris :", error);
          setError("Impossible de charger les favoris. Veuillez réessayer.");
        }
      } else {
        setUser(null);
        setFavoriteIDs([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // Charger les détails des trottinettes favorites
  useEffect(() => {
    const fetchScooters = async () => {
      setLoading(true);
      setError(null);
      const scooterDetails = [];
      try {
        for (const id of favoriteIDs) {
          const scooterRef = doc(db, "trottinettes", id); // Assurez-vous d'utiliser "trottinettes"
          const scooterDoc = await getDoc(scooterRef);
          if (scooterDoc.exists()) {
            scooterDetails.push({ itemID: id, ...scooterDoc.data() });
            console.log(`Trottinette trouvée : ${id}`, scooterDoc.data());
          } else {
            console.warn(`Trottinette non trouvée pour l'ID : ${id}`);
          }
        }
        setFavoriteScooters(scooterDetails);
      } catch (error) {
        console.error("Erreur lors du chargement des trottinettes :", error);
        setError("Impossible de charger les détails des trottinettes.");
      } finally {
        setLoading(false);
      }
    };

    if (favoriteIDs.length > 0) {
      fetchScooters();
    } else {
      setFavoriteScooters([]);
      setLoading(false);
    }
  }, [favoriteIDs]);

  // Retirer une trottinette des favoris
  const removeFavorite = async (scooterID) => {
    if (!user) return;

    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        favoritesTrottinettes: arrayRemove(scooterID),
      });
      setFavoriteIDs((prev) => prev.filter((id) => id !== scooterID));
      console.log(`Trottinette retirée des favoris : ${scooterID}`);
    } catch (error) {
      console.error("Erreur lors de la suppression des favoris :", error);
      setError("Impossible de retirer cette trottinette des favoris.");
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

  // Affichage si aucun favori n'est disponible
  if (favoriteScooters.length === 0) {
    return <p className="text-center text-gray-600 font-bold mt-10">Aucune trottinette favorite pour le moment.</p>;
  }

  // Affichage des favoris
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-bold m-6 text-blue-800 text-center">Mes Favoris</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {favoriteScooters.map((scooter) => (
          <Card
            key={scooter.itemID}
            trottinette={scooter}
            isSelected={false}
            onSelect={() => {}}
            disableSelect={true}
          />
        ))}
      </div>
    </div>
  );
}
