import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

// Firebase
import { auth, db } from "../firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore";

function ArticleCard({ article }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [user, setUser] = useState(null);

  // Gestion de l'état utilisateur
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Vérification initiale si l'article est favori
  useEffect(() => {
    const checkIfFavorite = async () => {
      if (user && article?.id) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists() && userDoc.data().favoriteArticles?.includes(article.id)) {
            setIsFavorite(true);
          }
        } catch (error) {
          console.error("Erreur lors de la vérification des favoris :", error);
        }
      }
    };

    checkIfFavorite();
  }, [user, article?.id]);

  // Ajout ou retrait de l'article des favoris
  const toggleFavorite = async () => {
    if (!user) {
      alert("Veuillez vous connecter pour ajouter aux favoris.");
      return;
    }

    const userRef = doc(db, "users", user.uid);
    try {
      if (isFavorite) {
        await updateDoc(userRef, {
          favoriteArticles: arrayRemove(article.id),
        });
        setIsFavorite(false);
      } else {
        await updateDoc(userRef, {
          favoriteArticles: arrayUnion(article.id),
        });
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des favoris :", error);
    }
  };

  if (!article) {
    console.error("Propriété 'article' est indéfinie.");
    return (
      <div className="article-card bg-red-100 p-4">
        <p className="text-red-500">Erreur : Article non disponible</p>
      </div>
    );
  }

  return (
    <article className="article-card bg-white shadow-lg overflow-hidden hover:scale-105 hover:border-2 hover:border-blue-200 md:transform-none cursor-pointer">
      <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold text-gray-800">{article.title}</h2>
          <Tippy content={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}>
            <button
              onClick={toggleFavorite}
              className="focus:outline-none transform transition-transform duration-200 hover:scale-110"
            >
              {isFavorite ? (
                <HeartIconSolid className="h-6 w-6 text-red-500" />
              ) : (
                <HeartIcon className="h-6 w-6 text-gray-500" />
              )}
            </button>
          </Tippy>
        </div>
        <p className="text-gray-600 mb-4">{article.description}</p>
      </div>
    </article>
  );
}

// Proptypes pour valider les propriétés
ArticleCard.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default ArticleCard;
