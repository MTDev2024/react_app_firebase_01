import React, { useState, useEffect, useRef } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { toast } from "react-toastify";

// Import Firebase et ses fonctions
import { auth, db } from "../firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, deleteDoc, collection, getDoc } from "firebase/firestore";

const Card = ({ trottinette, isSelected, onSelect, disableSelect, showCheckbox = true }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [user, setUser] = useState(null);
  const favoriteButtonRef = useRef(null); // Ref pour le bouton

  // Gestion de l'état utilisateur
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Vérification des favoris
  useEffect(() => {
    const checkIfFavorite = async () => {
      if (user && trottinette?.itemID) {
        try {
          const favoriteRef = doc(
            collection(db, "users", user.uid, "favoritesTrottinettes"),
            trottinette.itemID
          );
          const docSnapshot = await getDoc(favoriteRef);
          setIsFavorite(docSnapshot.exists());
        } catch (error) {
          console.error("Erreur lors de la vérification des favoris :", error);
        }
      }
    };

    checkIfFavorite();
  }, [user, trottinette]);

  // Fonction pour afficher un toast au-dessus du bouton
  const displayToast = (message, type) => {
    const buttonRect = favoriteButtonRef.current.getBoundingClientRect(); // Récupère la position du bouton
    const toastStyle = {
      position: "absolute",
      top: `${buttonRect.top + window.scrollY - 50}px`, // Ajuste la position au-dessus du bouton
      left: `${buttonRect.left + window.scrollX + buttonRect.width / 2}px`, // Centre horizontalement
      transform: "translateX(-50%)", // Centre le toast
      zIndex: 1000, // Assure que le toast est visible
    };

    toast(message, {
      type,
      position: "top-left", // Position initiale (style personnalisé remplacera ceci)
      style: toastStyle,
      autoClose: 3000,
    });
  };

  // Ajout ou suppression des favoris
  const toggleFavorite = async () => {
    if (!user) {
      displayToast("Veuillez vous connecter pour ajouter aux favoris.", "error");
      return;
    }

    const favoriteRef = doc(
      collection(db, "users", user.uid, "favoritesTrottinettes"),
      trottinette.itemID
    );

    try {
      if (isFavorite) {
        // Retirer des favoris
        await deleteDoc(favoriteRef);
        setIsFavorite(false);
        displayToast(`"${trottinette.marque} ${trottinette.modele}" retirée des favoris.`, "info");
      } else {
        // Ajouter aux favoris
        await setDoc(favoriteRef, {
          itemID: trottinette.itemID,
          marque: trottinette.marque,
          modele: trottinette.modele,
          dateAdded: new Date().toISOString(),
        });
        setIsFavorite(true);
        displayToast(`"${trottinette.marque} ${trottinette.modele}" ajoutée aux favoris.`, "success");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des favoris :", error);
      displayToast("Une erreur est survenue. Veuillez réessayer.", "error");
    }
  };

  return (
    <div className="flex flex-col md:flex-row border rounded-lg shadow-md bg-gray-800 text-white p-4 sm:p-6 space-y-4 md:space-y-0 md:space-x-4">
      {/* Colonne de gauche : Informations */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <span className="block mb-1 text-yellow-400 italic font-medium">
            Sélection de la rédaction
          </span>
          <h3 className="text-xl sm:text-2xl font-bold mb-2">{trottinette.marque}</h3>
          <h3 className="text-lg sm:text-xl font-bold mb-4">{trottinette.modele}</h3>
          <div className="flex items-center mb-4">
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
          <div>
            <p>
              <strong>Autonomie :</strong> {trottinette.distance_max || "NC"} km
            </p>
            <p>
              <strong>Poids max utilisateur :</strong> {trottinette.poids_max || "NC"} kg
            </p>
            <p>
              <strong>Puissance moteur :</strong> {trottinette.puissance_moteur || "NC"} W
            </p>
          </div>
        </div>
        <div className="flex mt-4 justify-around items-center">
          {showCheckbox && (
            <Tippy content="Comparer">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onSelect(trottinette.itemID)}
                className="form-checkbox h-5 w-5"
                disabled={disableSelect}
                aria-label="Sélectionner pour comparer"
              />
            </Tippy>
          )}
          <Tippy content={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}>
            <button
              ref={favoriteButtonRef} // Ref pour obtenir les coordonnées du bouton
              onClick={toggleFavorite}
              className="focus:outline-none transform transition-transform duration-200 hover:scale-110"
              aria-label={
                isFavorite
                  ? "Retirer cette trottinette des favoris"
                  : "Ajouter cette trottinette aux favoris"
              }
            >
              {isFavorite ? (
                <HeartIconSolid className="h-8 w-8 text-red-500" />
              ) : (
                <HeartIcon className="h-8 w-8 text-gray-500" />
              )}
            </button>
          </Tippy>
          <button
            className="bg-blue-700 hover:bg-blue-800 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg transform transition-transform hover:scale-105"
            aria-label="Voir la fiche détaillée"
          >
            Voir la fiche détaillée
          </button>
        </div>
      </div>
      <div className="flex-1">
        <img
          src={trottinette.image}
          alt={trottinette.modele}
          className="w-full h-40 sm:h-full object-contain"
        />
      </div>
    </div>
  );
};

export default Card;
