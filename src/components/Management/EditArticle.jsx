import React, { useState } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

const EditArticle = ({ article, onClose, onUpdated }) => {
  const [articleData, setArticleData] = useState({
    title: article.title,
    description: article.description,
    content: article.content,
    imageUrl: article.imageUrl,
    tags: article.tags.join(", "),
    categories: article.categories.join(", "),
    featured: article.featured,
  });
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setArticleData({
      ...articleData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const articleRef = doc(db, "articles", article.id);
      // Préparer l'objet avec le bon format pour tags et categories
      const updatedArticle = {
        ...articleData,
        tags: articleData.tags.split(",").map((tag) => tag.trim()),
        categories: articleData.categories.split(",").map((cat) => cat.trim()),
        // Optionnel : mettre à jour la date pour indiquer la dernière modification
        date: new Date(),
      };
      await updateDoc(articleRef, updatedArticle);
      setMessage("Article mis à jour avec succès !");
      if (onUpdated) onUpdated(); // Callback pour rafraîchir la liste des articles
      onClose(); // Ferme l'interface d'édition
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'article :", error);
      setMessage("Une erreur est survenue lors de la mise à jour de l'article.");
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Éditer l'article</h2>
      {message && <p className="text-green-600 mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-gray-700">Titre</label>
          <input
            type="text"
            name="title"
            value={articleData.title}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700">Description</label>
          <textarea
            name="description"
            value={articleData.description}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700">Contenu</label>
          <textarea
            name="content"
            value={articleData.content}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={articleData.imageUrl}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700">Tags</label>
          <input
            type="text"
            name="tags"
            value={articleData.tags}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Tags, séparés par des virgules"
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700">Catégories</label>
          <input
            type="text"
            name="categories"
            value={articleData.categories}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Catégories, séparées par des virgules"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="featured"
            checked={articleData.featured}
            onChange={handleInputChange}
            className="mr-2"
          />
          <label className="text-gray-700">Mettre en avant</label>
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Mettre à jour
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditArticle;
