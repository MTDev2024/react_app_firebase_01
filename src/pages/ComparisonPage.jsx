import React, { useState, useEffect } from "react";
import { HeartIcon } from "@heroicons/react/24/outline"; // Icône de coeur (vide)
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid"; // Icône de coeur (rempli)
import Tippy from "@tippyjs/react"; // Librairie pour les tooltips
import "tippy.js/dist/tippy.css"; // Styles par défaut de Tippy.js
import { useLocation, useNavigate } from "react-router-dom"; // Pour naviguer entre les pages et accéder aux données de l'état

// Firebase
import { auth, db } from "../firebase.js";
import { doc, setDoc, deleteDoc, collection, getDoc, getDocs } from "firebase/firestore";

export default function ComparisonPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedScooters } = location.state || { selectedScooters: [] };

  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // Gestion de l'état utilisateur
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const userRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const favoritesCollection = collection(userRef, "favoritesTrottinettes");
            const favoriteDocs = await getDocs(favoritesCollection);
            const favoriteIds = favoriteDocs.docs.map((doc) => doc.id);
            setFavorites(favoriteIds);
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

  // Gestion des favoris
  const toggleFavorite = async (scooterID) => {
    if (!user) {
      alert("Veuillez vous connecter pour gérer vos favoris.");
      return;
    }

    const favoriteRef = doc(collection(db, "users", user.uid, "favoritesTrottinettes"), scooterID);

    try {
      if (favorites.includes(scooterID)) {
        await deleteDoc(favoriteRef);
        setFavorites((prev) => prev.filter((favID) => favID !== scooterID));
      } else {
        await setDoc(favoriteRef, {
          trottinetteId: scooterID,
          dateAdded: new Date().toISOString(),
        });
        setFavorites((prev) => [...prev, scooterID]);
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des favoris :", error);
    }
  };

  // Affichage d'un message si aucune trottinette n'est sélectionnée
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
          console.log("Données de la trottinette :", scooter);

          const isFavorite = favorites.includes(scooter.itemID);

          return (
            <div
              key={scooter.itemID}
              className="border rounded-lg shadow-md bg-gray-800 text-white p-4 flex flex-col items-center space-y-4 sm:space-y-0"
            >
              {/* Image de la trottinette */}
              <img
                src={scooter.image || "#"}
                alt={`${scooter.marque || "NC"} - ${scooter.modele || "NC"}`}
                className="w-full h-48 object-cover object-bottom rounded-md mb-4"
              />
              {/* Détails */}
              <div className="text-center w-full">
                <h3 className="text-2xl font-bold">{scooter.marque || "NC"}</h3>
                <h2 className="text-xl font-bold mb-2">{scooter.modele || "NC"}</h2>
                <div className="text-left mt-2">
                  <p><strong>Autonomie :</strong> {scooter.distance_max || "NC"} km</p>
                  <p><strong>Poids max utilisateur :</strong> {scooter.poids_max || "NC"} kg</p>
                  <p><strong>Poids trottinette :</strong> {scooter.poids_trottinette || "NC"} kg</p>
                  <p><strong>Type de guidon :</strong> {scooter.guidon?.join(", ") || "NC"}</p>
                  <p><strong>Freins :</strong> {scooter.freins?.join(", ") || "NC"}</p>
                  <p><strong>Type de pneus :</strong> {scooter.pneus_type?.join(", ") || "NC"}</p>
                  <p><strong>Taille des pneus :</strong> {scooter.pneus_taille || "NC"}</p>
                  <p><strong>Étanchéité :</strong> {scooter.etancheite?.join(", ") || "NC"}</p>
                  <p><strong>Capacité de la batterie :</strong> {scooter.batterie_capacite || "NC"} Ah</p>
                  <p><strong>Type de batterie :</strong> {scooter.batterie_type?.join(", ") || "NC"}</p>
                  <p><strong>Temps de charge :</strong> {scooter.batterie_charge || "NC"} heures</p>
                  <p><strong>Connectivité :</strong> {scooter.connectivite?.join(", ") || "NC"}</p>
                  <p><strong>Type d'amortisseurs :</strong> {scooter.type_amortisseurs?.join(", ") || "NC"}</p>
                  <p><strong>Position du moteur :</strong> {scooter.moteur_position?.join(", ") || "NC"}</p>
                  <p><strong>Puissance moteur :</strong> {scooter.puissance_moteur || "NC"} W</p>
                  <p><strong>Couple moteur :</strong> {scooter.couple_moteur || "NC"} Nm</p>
                  <p><strong>Pente max :</strong> {scooter.pente_max || "NC"} %</p>
                  <p><strong>Vitesse max bridée :</strong> {scooter.vitesse_max_bridee || "NC"} km/h</p>
                  <p><strong>Vitesse max débridée :</strong> {scooter.vitesse_max_debridee || "NC"} km/h</p>
                  <p><strong>Type de trajets :</strong> {scooter.type_trajet?.join(", ") || "NC"}</p>
                  <p><strong>Relief supporté :</strong> {scooter.relief?.join(", ") || "NC"}</p>
                  <p><strong>Éclairage :</strong> {scooter.eclairage_ambiant?.join(", ") || "NC"}</p>
                  <p><strong>Dimensions de la plateforme :</strong> {scooter.plateforme_dimensions || "NC"}</p>
                  <p><strong>Revêtement de la plateforme :</strong> {scooter.plateforme_revetement?.join(", ") || "NC"}</p>
                  <p><strong>Type d'utilisation :</strong> {scooter.type_utilisation?.join(", ") || "NC"}</p>
                </div>
              </div>

              {/* Boutons */}
              <div className="mt-4 flex justify-center items-center">
                <Tippy content={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}>
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
        {/* Bouton Retour */}
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-700 hover:scale-105 transition-all duration-300"
        >
          Retour
        </button>
      </div>
    </div>
  );
}
