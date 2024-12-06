import React, { useState, useEffect } from "react";
import { HeartIcon } from "@heroicons/react/24/outline"; // Icône de coeur (vide)
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid"; // Icône de coeur (rempli)
import Tippy from "@tippyjs/react"; // Librairie pour les tooltips
import "tippy.js/dist/tippy.css"; // Styles par défaut de Tippy.js
import { useLocation, useNavigate } from "react-router-dom"; // Pour naviguer entre les pages et accéder aux données de l'état
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Firebase Auth pour gérer la connexion utilisateur
import { getFirestore, doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"; // Firestore pour gérer les favoris

export default function ComparisonPage() {
  // Récupération des données envoyées depuis la page précédente (par exemple, la liste des trottinettes sélectionnées)
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedScooters } = location.state || { selectedScooters: [] }; // Défaut : tableau vide si aucune donnée n'est reçue

  // Initialisation des services Firebase (Auth et Firestore)
  const auth = getAuth();
  const db = getFirestore();

  // État pour stocker l'utilisateur connecté
  const [user, setUser] = useState(null);

  // État pour stocker la liste des favoris (IDs des trottinettes favorites de l'utilisateur)
  const [favorites, setFavorites] = useState([]);

  // Effet pour vérifier si un utilisateur est connecté et récupérer ses favoris depuis Firestore
  useEffect(() => {
    // Surveille les changements d'état de connexion de l'utilisateur
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Met à jour l'utilisateur connecté
        try {
          // Récupère le document utilisateur depuis Firestore
          const userRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userRef);

          // Si le document existe, récupère les favoris (ou un tableau vide par défaut)
          if (userDoc.exists()) {
            setFavorites(userDoc.data().favoritesTrottinettes || []);
          }
        } catch (error) {
          console.error("Erreur lors de la récupération des favoris :", error);
        }
      } else {
        setUser(null); // Si aucun utilisateur n'est connecté
        setFavorites([]); // Réinitialise les favoris
      }
    });

    return () => unsubscribe(); // Nettoie l'abonnement à onAuthStateChanged
  }, [auth, db]);

  // Fonction pour ajouter ou retirer une trottinette des favoris
  const toggleFavorite = async (scooterID) => {
    if (!user) {
      alert("Veuillez vous connecter pour gérer vos favoris."); // Avertit si aucun utilisateur n'est connecté
      return;
    }

    const userRef = doc(db, "users", user.uid); // Référence au document utilisateur dans Firestore

    try {
      if (favorites.includes(scooterID)) {
        // Si l'ID est déjà dans les favoris, on le supprime
        await updateDoc(userRef, {
          favoritesTrottinettes: arrayRemove(scooterID),
        });
        setFavorites((prev) => prev.filter((favID) => favID !== scooterID)); // Met à jour l'état local
      } else {
        // Sinon, on l'ajoute aux favoris
        await updateDoc(userRef, {
          favoritesTrottinettes: arrayUnion(scooterID),
        });
        setFavorites((prev) => [...prev, scooterID]); // Met à jour l'état local
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des favoris :", error);
    }
  };

  // Si aucune trottinette n'a été sélectionnée, affiche un message d'avertissement
  if (selectedScooters.length === 0) {
    return (
      <p className="text-center text-red-600 font-bold mt-10">
        Aucune trottinette sélectionnée pour la comparaison.
      </p>
    );
  }

  // Affiche les trottinettes sélectionnées pour comparaison
  return (
    <div className="container mx-auto p-6">
      {/* Titre principal */}
      <h2 className="text-4xl font-bold m-6 text-blue-800 text-center">
        Résultats de comparaison
      </h2>

      {/* Grille des trottinettes à comparer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {selectedScooters.map((scooter) => {
          // Vérifie si la trottinette est dans les favoris
          const isFavorite = favorites.includes(scooter.itemID);

          return (
            <div
              key={scooter.itemID} // Clé unique pour chaque carte
              className="border rounded-lg shadow-md bg-gray-800 text-white p-4 flex flex-col items-center"
            >
              {/* Image de la trottinette */}
              <img
                src={scooter.image}
                alt={`${scooter.marque} - ${scooter.modele}`}
                className="w-full h-48 object-cover object-bottom rounded-md mb-4"
              />

              {/* Informations de la trottinette */}
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

              {/* Bouton pour gérer les favoris */}
              <div className="mt-4 flex justify-center items-center space-x-4">
                <Tippy content="Ajouter aux favoris">
                  <button
                    onClick={() => toggleFavorite(scooter.itemID)}
                    className="focus:outline-none transform transition-transform duration-200 hover:scale-110"
                  >
                    {/* Icône de coeur (rempli si favori, vide sinon) */}
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

      {/* Bouton pour revenir à la page précédente */}
      <div className="mt-8 text-center">
        <button
          onClick={() => navigate(-1)} // Retourne à la page précédente
          className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
        >
          Retour aux résultats
        </button>
      </div>
    </div>
  );
}
