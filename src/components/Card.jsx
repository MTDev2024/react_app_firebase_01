import React, { useState, useEffect } from "react";
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore";

const Card = ({ trottinette }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    // Surveiller les changements d'état de l'utilisateur connecté
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("Utilisateur mis à jour : ", currentUser);
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    // Vérifiez si la trottinette est déjà en favoris quand le composant est monté
    const checkIfFavorite = async () => {
      if (user && trottinette?.itemID) {
        console.log("Vérification des favoris pour l'utilisateur : ", user.uid);
        try {
          const userRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            console.log("Données utilisateur récupérées : ", userDoc.data());
            if (userDoc.data().favoritesTrottinettes?.includes(trottinette.itemID)) {
              setIsFavorite(true);
            }
          } else {
            console.log("Le document utilisateur n'existe pas.");
          }
        } catch (error) {
          console.error("Erreur lors de la vérification des favoris :", error);
        }
      }
    };

    checkIfFavorite();
  }, [user, db, trottinette]);

  const toggleFavorite = async () => {
    if (!user) {
      alert("Veuillez vous connecter pour ajouter aux favoris.");
      return;
    }

    const userRef = doc(db, "users", user.uid);

    try {
      if (isFavorite) {
        // Supprimer des favoris
        console.log("Suppression de la trottinette des favoris...");
        await updateDoc(userRef, {
          favoritesTrottinettes: arrayRemove(trottinette.itemID)
        });
        console.log("Trottinette supprimée des favoris.");
        setIsFavorite(false);
      } else {
        // Ajouter aux favoris
        console.log("Ajout de la trottinette aux favoris...");
        await updateDoc(userRef, {
          favoritesTrottinettes: arrayUnion(trottinette.itemID)
        });
        console.log("Trottinette ajoutée aux favoris.");
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des favoris :", error);
    }
  };

  return (
    <div className="flex border rounded-lg shadow-md bg-gray-800 text-white p-6">
      {/* Colonne de gauche : Informations */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <span className="block mb-1 text-yellow-400 italic font-medium">Sélection de la rédaction</span>
          <h3 className="text-2xl font-bold mb-2">{trottinette.marque}</h3>
          <h3 className="text-xl font-bold mb-4">{trottinette.modele}</h3>
          <div className="flex items-center mb-4">
            {/* Notation étoiles */}
            <div className="flex items-center text-yellow-400 mr-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <svg
                  key={index}
                  className="h-4 w-4"
                  fill={index < trottinette.rating ? "currentColor" : "none"}
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                </svg>
              ))}
            </div>
            <p className="text-sm">{trottinette.reviews} avis</p>
          </div>
          {/* Caractéristiques */}
          <p><strong>Autonomie :</strong> {trottinette.distance_max} km</p>
          <p><strong>Poids max utilisateur :</strong> {trottinette.poids_max} kg</p>
          <p><strong>Poids trottinette :</strong> {trottinette.poids_trottinette} kg</p>
          <p><strong>Guidon :</strong> {trottinette.taille_guidon}</p>
          <p className="text-2xl font-bold mt-4">{trottinette.prix} €</p>
        </div>
        {/* Boutons d'action */}
        <div className="flex mt-4 justify-around">
          <button className="bg-primary-700 hover:bg-primary-800 text-yellow-400 px-4 py-2 rounded-lg">
            Comparer
          </button>
          <button onClick={toggleFavorite} className="focus:outline-none">
            {isFavorite ? (
              <HeartIconSolid className="h-8 w-8 text-red-500" />
            ) : (
              <HeartIcon className="h-8 w-8 text-gray-500" />
            )}
          </button>
          <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg mr-4">
            Voir la fiche détaillée
          </button>
        </div>
      </div>
      {/* Colonne de droite : Image */}
      <div className="flex-1">
        <img
          src={trottinette.image}
          alt={trottinette.modele}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default Card;
