import React, { useState, useEffect } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // Styles par défaut
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

export default function ComparisonPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedScooters } = location.state || { selectedScooters: [] };

  const auth = getAuth();
  const db = getFirestore();

  const [user, setUser] = useState(null); // État pour l'utilisateur connecté
  const [favorites, setFavorites] = useState(
    selectedScooters.map((scooter) => ({ id: scooter.itemID, isFavorite: false }))
  );

  // Vérifie si un utilisateur est connecté
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Met à jour l'utilisateur connecté
    });
    return () => unsubscribe(); // Nettoie l'abonnement
  }, [auth]);

  const toggleFavorite = async (scooterID) => {
    if (!user) {
      alert("Veuillez vous connecter pour gérer vos favoris.");
      return;
    }

    const userRef = doc(db, "users", user.uid);
    const scooterIndex = favorites.findIndex((fav) => fav.id === scooterID);

    try {
      if (favorites[scooterIndex].isFavorite) {
        // Supprimer des favoris
        await updateDoc(userRef, {
          favoritesTrottinettes: arrayRemove(scooterID),
        });
        setFavorites((prev) =>
          prev.map((fav) =>
            fav.id === scooterID ? { ...fav, isFavorite: false } : fav
          )
        );
      } else {
        // Ajouter aux favoris
        await updateDoc(userRef, {
          favoritesTrottinettes: arrayUnion(scooterID),
        });
        setFavorites((prev) =>
          prev.map((fav) =>
            fav.id === scooterID ? { ...fav, isFavorite: true } : fav
          )
        );
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des favoris :", error);
    }
  };

  if (selectedScooters.length === 0) {
    return (
      <p className="text-center text-red-600 font-bold mt-10">
        Aucune trottinette sélectionnée pour la comparaison.
      </p>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-bold m-6 text-blue-800 text-center">
        Résultats de comparaison
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {selectedScooters.map((scooter) => {
          const isFavorite = favorites.find((fav) => fav.id === scooter.itemID)
            ?.isFavorite;

          return (
            <div
              key={scooter.itemID}
              className="border rounded-lg shadow-md bg-gray-800 text-white p-4 flex flex-col items-center"
            >
              {/* Image */}
              <img
                src={scooter.image}
                alt={`${scooter.marque} - ${scooter.modele}`}
                className="w-full h-60 object-cover object-bottom rounded-md mb-4"
              />
              {/* Informations */}
              <div className="text-center w-full">
                <h3 className="text-2xl font-bold">{scooter.marque}</h3>
                <h2 className="text-xl font-bold mb-2">{scooter.modele}</h2>
                <div className="text-left mt-4">
                  <p className="mt-4" >
                    <strong>Autonomie :</strong> {scooter.distance_max} km
                  </p>
                  <p  className="mt-1" >
                    <strong>Poids max utilisateur :</strong> {scooter.poids_max} kg
                  </p>
                  <p  className="mt-1" >
                    <strong>Poids trottinette :</strong> {scooter.poids_trottinette} kg
                  </p>
                  <p  className="mt-1" >
                    <strong>Guidon :</strong> {scooter.taille_guidon}
                  </p>
                  <p  className="mt-1" >
                    <strong>Type de trajet :</strong>{" "}
                    {scooter.type_trajet.join(", ")}
                  </p>
                  <p  className="mt-1" >
                    <strong>Relief :</strong> {scooter.relief.join(", ")}
                  </p>
                  <p className="text-2xl font-bold mt-4">{scooter.prix} €</p>
                </div>
                
              </div>
              {/* Boutons */}
              <div className="mt-4 flex space-x-4">
                <Tippy content="Ajouter aux favoris">
                  <button
                    onClick={() => toggleFavorite(scooter.itemID)}
                    className="focus:outline-none transform transition-transform duration-200 hover:scale-110"
                  >
                    {isFavorite ? (
                      <HeartIconSolid className="h-8 w-8 text-red-500" />
                    ) : (
                      <HeartIcon className="h-8 w-8 text-gray-500" />
                    )}
                  </button>
                </Tippy>
                <button className="bg-blue-700 hover:bg-blue-800 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg transform transition-transform hover:scale-105">
            Voir la fiche détaillée
          </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bouton pour revenir aux résultats */}
      <div className="mt-8 text-center">
        <button
          onClick={() => navigate(-1)} // Retourne à la page précédente (les résultats)
          className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
        >
          Retour aux résultats
        </button>
      </div>
    </div>
  );
}
