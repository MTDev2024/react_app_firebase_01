import React, { useState, useEffect } from "react";
import { HeartIcon } from "@heroicons/react/24/outline"; // Icône de coeur (vide)
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid"; // Icône de coeur (rempli)
import Tippy from "@tippyjs/react"; // Librairie pour les tooltips
import "tippy.js/dist/tippy.css"; // Styles par défaut de Tippy.js
import { useLocation, useNavigate } from "react-router-dom"; // Pour naviguer entre les pages et accéder aux données de l'état
import Questionnaire from "../components/Questionnaire";

import { auth, db } from "../firebase.js";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"; // Firestore pour gérer les favoris

export default function ComparisonPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedScooters } = location.state || { selectedScooters: [] };

  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false); // État pour démarrer le questionnaire

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const userRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            setFavorites(userDoc.data().favoritesTrottinettes || []);
          }
        } catch (error) {
          console.error("Erreur lors de la récupération des favoris :", error);
        }
      } else {
        setUser(null);
        setFavorites([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleFavorite = async (scooterID) => {
    if (!user) {
      alert("Veuillez vous connecter pour gérer vos favoris.");
      return;
    }

    const userRef = doc(db, "users", user.uid);

    try {
      if (favorites.includes(scooterID)) {
        await updateDoc(userRef, {
          favoritesTrottinettes: arrayRemove(scooterID),
        });
        setFavorites((prev) => prev.filter((favID) => favID !== scooterID));
      } else {
        await updateDoc(userRef, {
          favoritesTrottinettes: arrayUnion(scooterID),
        });
        setFavorites((prev) => [...prev, scooterID]);
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des favoris :", error);
    }
  };

  const handleRestart = () => {
    setShowQuestionnaire(true); // Active l'état pour afficher le questionnaire
  };

  if (showQuestionnaire) {
    return <Questionnaire />; // Retourne directement le questionnaire
  }

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
          const isFavorite = favorites.includes(scooter.itemID);

          return (
            <div
              key={scooter.itemID}
              className="border rounded-lg shadow-md bg-gray-800 text-white p-4 flex flex-col items-center"
            >
              <img
                src={scooter.image}
                alt={`${scooter.marque} - ${scooter.modele}`}
                className="w-full h-48 object-cover object-bottom rounded-md mb-4"
              />
              <div className="text-center w-full">
                <h3 className="text-2xl font-bold">{scooter.marque}</h3>
                <h2 className="text-xl font-bold mb-2">{scooter.modele}</h2>
                <div className="text-left mt-2">
                  <p>
                    <strong>Autonomie :</strong> {scooter.distance_max} km
                  </p>
                  <p>
                    <strong>Poids max utilisateur :</strong> {scooter.poids_max} kg
                  </p>
                  <p>
                    <strong>Poids trottinette :</strong> {scooter.poids_trottinette} kg
                  </p>
                  <p>
                    <strong>Guidon :</strong> {scooter.taille_guidon}
                  </p>
                  <p>
                    <strong>Type de trajet :</strong> {scooter.type_trajet.join(", ")}
                  </p>
                  <p>
                    <strong>Relief :</strong> {scooter.relief.join(", ")}
                  </p>
                  <p className="text-2xl font-bold mt-4">{scooter.prix} €</p>
                </div>
              </div>

              <div className="mt-4 flex justify-center items-center space-x-4">
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
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center space-x-4">
        {/* Bouton Recommencer */}
        <button
          onClick={handleRestart}
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Recommencer
        </button>

        {/* Bouton Retour aux résultats */}
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-700 hover:scale-105 transition-all duration-300"
        >
          Retour aux résultats
        </button>
      </div>
    </div>
  );
}
