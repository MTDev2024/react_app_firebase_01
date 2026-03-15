import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom"; // Pour naviguer vers la page de détail
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

// Firebase
import { auth, db } from "../firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, deleteDoc, collection, getDoc } from "firebase/firestore";

function ArticleCard({ article }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [user, setUser] = useState(null);

  // Gestion de l'état utilisateur (vérification si connecté)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Vérification initiale si l'article est favori
  useEffect(() => {
    const checkIfFavorite = async () => {
      if (user && article?.slug) {
        try {
          const favoriteRef = doc(
            collection(db, "users", user.uid, "favoritesArticles"),
            article.slug
          );
          const docSnapshot = await getDoc(favoriteRef);
          setIsFavorite(docSnapshot.exists());
        } catch (error) {
          console.error("Erreur lors de la vérification des favoris :", error);
        }
      }
    };

    checkIfFavorite();
  }, [user, article?.slug]);

  // Ajout ou retrait de l'article des favoris
  const toggleFavorite = async () => {
    if (!user) {
      alert("Veuillez vous connecter pour ajouter aux favoris.");
      return;
    }

    const favoriteRef = doc(
      collection(db, "users", user.uid, "favoritesArticles"),
      article.slug
    );

    try {
      if (isFavorite) {
        // Retirer des favoris
        await deleteDoc(favoriteRef);
        console.log(`Article retiré des favoris : ${article.slug}`);
        setIsFavorite(false);
      } else {
        // Ajouter aux favoris
        await setDoc(favoriteRef, {
          articleSlug: article.slug,
          title: article.title,
          dateAdded: new Date().toISOString(),
        });
        console.log(`Article ajouté aux favoris : ${article.slug}`);
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
    <article
      className={`article-card bg-white shadow-lg rounded-lg overflow-hidden ${
        article.featured ? "border-2 border-yellow-400" : ""
      } hover:scale-105 transform transition duration-200 cursor-pointer`}
    >
      {/* Image de l'article */}
      <Link to={`/articles/${article.slug}`}>
        <div className="overflow-hidden">
          <img
            src={article.imageUrl || "/assets/images/placeholder.jpg"}
            alt={article.title}
            className="w-full h-48 object-cover transform transition-transform duration-300 ease-in-out hover:translate-y-2 hover:scale-105 hover:shadow-lg"
          />
        </div>
      </Link>
      <div className="p-6">
        {/* Titre et bouton favoris */}
        <div className="flex justify-between items-center mb-2">
          <Link to={`/articles/${article.slug}`}>
            <h2 className="text-xl font-bold text-gray-800 hover:underline">
              {article.title}
            </h2>
          </Link>
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

        {/* Description */}
        <p className="text-gray-600 mb-4">{article.description}</p>

        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-2">
          {Array.isArray(article.tags) &&
            article.tags.map((tag, index) => (
              <span
                key={index}
                className="text-sm bg-gray-100 text-gray-800 px-2 py-1 rounded-md"
              >
                {tag}
              </span>
            ))}
        </div>

        {/* Catégories */}
        <div className="mb-4">
          {Array.isArray(article.categories) &&
            article.categories.map((category, index) => (
              <span
                key={index}
                className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-md mr-2"
              >
                {category}
              </span>
            ))}
        </div>

        {/* Lien vers la page de détail */}
        <Link to={`/articles/${article.slug}`} className="text-blue-600 hover:underline">
          Lire la suite →
        </Link>
      </div>
    </article>
  );
}

// PropTypes pour valider les propriétés
ArticleCard.propTypes = {
  article: PropTypes.shape({
    slug: PropTypes.string.isRequired, // Slug unique
    title: PropTypes.string.isRequired, // Titre de l'article
    description: PropTypes.string.isRequired, // Courte description
    imageUrl: PropTypes.string, // URL de l'image
    tags: PropTypes.arrayOf(PropTypes.string), // Tableau de tags
    categories: PropTypes.arrayOf(PropTypes.string), // Tableau de catégories
    featured: PropTypes.bool, // Article en avant
  }).isRequired,
};

export default ArticleCard;
