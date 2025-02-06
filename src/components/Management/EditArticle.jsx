import React, { useState } from "react";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { slugify } from "../../utils/slugify"; // Assurez-vous d'importer la fonction slugify

const EditArticle = ({ article, onClose, onUpdated }) => {
  const [articleData, setArticleData] = useState({
    title: article.title,
    slug: article.slug || slugify(article.title), // Générer un slug si absent
    description: article.description,
    content: article.content,
    imageUrl: article.imageUrl || "",
    tags: article.tags.join(", "),
    categories: article.categories.join(", "),
    featured: article.featured,
  });

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  // Gestion des champs modifiés
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setArticleData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      slug: name === "title" ? slugify(value) : prev.slug, // Met à jour le slug si le titre change
    }));
  };

  // Gestion de l'upload d'image
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Fonction de mise à jour de l'article
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!articleData.slug) {
      console.error("Erreur : le slug est manquant !");
      alert("Impossible de mettre à jour l'article : identifiant invalide.");
      return;
    }

    try {
      setUploading(true);
      let finalImageUrl = articleData.imageUrl;

      // Upload de l’image si une nouvelle est sélectionnée
      if (image) {
        const storage = getStorage();
        const storageRef = ref(storage, `articles/${articleData.slug}-${image.name}`);
        await uploadBytes(storageRef, image);
        finalImageUrl = await getDownloadURL(storageRef);
      }

      // Vérifier si le slug a changé
      if (article.slug !== articleData.slug) {
        console.log("⚠️ Le slug a changé. Vérification de l'ancien document...");

        const oldArticleRef = doc(db, "articles", article.slug);
        const oldArticleSnap = await getDoc(oldArticleRef);

        if (oldArticleSnap.exists()) {
          console.log("✅ Suppression de l'ancien article...");
          await updateDoc(oldArticleRef, { deleted: true }); // Marque l'ancien article comme supprimé
        }
      }

      // Mise à jour de l'article avec le bon slug
      const articleRef = doc(db, "articles", articleData.slug);

      await updateDoc(articleRef, {
        title: articleData.title,
        slug: articleData.slug,
        description: articleData.description,
        content: articleData.content,
        imageUrl: finalImageUrl,
        tags: articleData.tags.split(",").map((tag) => tag.trim()),
        categories: articleData.categories.split(",").map((cat) => cat.trim()),
        featured: articleData.featured,
        dateUpdated: new Date(),
      });

      setMessage("Article mis à jour avec succès !");
      if (onUpdated) onUpdated();
      onClose();
    } catch (error) {
      console.error("❌ Erreur lors de la mise à jour de l'article :", error);
      setMessage("Une erreur est survenue.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Éditer l'article</h2>
      {message && <p className="text-green-600 mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Titre */}
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

        {/* Slug (lecture seule) */}
        <div>
          <label className="block mb-2 text-gray-700">Slug</label>
          <input
            type="text"
            name="slug"
            value={articleData.slug}
            readOnly
            className="w-full border rounded px-3 py-2 bg-gray-200"
          />
        </div>

        {/* Description */}
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

        {/* Contenu */}
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

        {/* Aperçu de l’image */}
        <div>
          <label className="block mb-2 text-gray-700">Image actuelle</label>
          {articleData.imageUrl ? (
            <img src={articleData.imageUrl} alt="Aperçu" className="w-40 h-40 object-cover rounded-lg mb-2" />
          ) : (
            <p className="text-gray-500">Aucune image enregistrée.</p>
          )}
        </div>

        {/* Upload image */}
        <div>
          <label className="block mb-2 text-gray-700">Télécharger une nouvelle image</label>
          <input type="file" onChange={handleImageChange} className="w-full border rounded px-3 py-2" accept="image/*" />
        </div>

        {/* URL image */}
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

        {/* Tags */}
        <div>
          <label className="block mb-2 text-gray-700">Tags</label>
          <input type="text" name="tags" value={articleData.tags} onChange={handleInputChange} className="w-full border rounded px-3 py-2" />
        </div>

        {/* Catégories */}
        <div>
          <label className="block mb-2 text-gray-700">Catégories</label>
          <input type="text" name="categories" value={articleData.categories} onChange={handleInputChange} className="w-full border rounded px-3 py-2" />
        </div>

        {/* Boutons */}
        <div className="flex space-x-4">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" disabled={uploading}>
            {uploading ? "Mise à jour en cours..." : "Mettre à jour"}
          </button>
          <button type="button" onClick={onClose} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditArticle;
