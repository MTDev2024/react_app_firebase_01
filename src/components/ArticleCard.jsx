import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function ArticleCard({ title, description, image, link }) {
  return (
    <article className="article-card bg-white shadow-lg overflow-hidden hover:scale-105 hover:border-2 hover:border-blue-200 md:transform-none cursor-pointer">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <Link to={link} className="text-blue-600 font-semibold hover:underline">
          Lire la suite
        </Link>
      </div>
    </article>
  );
}

// Définition des types de props pour éviter les erreurs
ArticleCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default ArticleCard;
