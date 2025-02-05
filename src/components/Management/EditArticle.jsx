import React, { useState } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const EditArticle = ({ article, onClose, onUpdated }) => {
  const [articleData, setArticleData] = useState({
    title: article.title,
    description: article.description,
    content: article.content,
    imageUrl: article.imageUrl || "", // Conserver l'ancienne URL si elle existe
    tags: article.tags.join(", "),
    categories: article.categories.join(", "),
    featured: article.featured,
  });

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setArticleData({
      ...articleData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);
      let finalImageUrl = articleData.imageUrl; // Conserver l’ancienne image par défaut

      if (image) {
        const storage = getStorage();
        const storageRef = ref(storage, `articles/${image.name}`);
        await uploadBytes(storageRef, image);
        finalImageUrl = await getDownloadURL(storageRef); // Remplace l’image par l’upload Firebase
      }

      const articleRef = doc(db, "articles", article.id);
      const updatedArticle = {
        ...articleData,
        imageUrl: finalImageUrl, // Utiliser l'URL Firebase si une image est uploadée, sinon garder l’ancienne
        tags: articleData.tags.split(",").map((tag) => tag.trim()),
        categories: articleData.categories.split(",").map((cat) => cat.trim()),
        date: new Date(), // Mettre à jour la date de modification
      };

      await updateDoc(articleRef, updatedArticle);
      setMessage("Article mis à jour avec succès !");
      if (onUpdated) onUpdated(); // Rafraîchir la liste des articles
      onClose(); // Fermer l'interface d'édition
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'article :", error);
      setMessage("Une erreur est survenue lors de la mise à jour.");
    } finally {
      setUploading(false);
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
          <label className="block mb-2 text-gray-700">Image actuelle</label>
          {articleData.imageUrl ? (
            <img src={articleData.imageUrl} alt="Aperçu" className="w-40 h-40 object-cover rounded-lg mb-2" />
          ) : (
            <p className="text-gray-500">Aucune image enregistrée.</p>
          )}
        </div>
        <div>
          <label className="block mb-2 text-gray-700">Télécharger une nouvelle image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full border rounded px-3 py-2"
            accept="image/*"
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700">OU entrer une nouvelle URL d'image</label>
          <input
            type="text"
            name="imageUrl"
            value={articleData.imageUrl}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            placeholder="https://exemple.com/image.jpg"
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
            disabled={uploading}
          >
            {uploading ? "Mise à jour en cours..." : "Mettre à jour"}
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
