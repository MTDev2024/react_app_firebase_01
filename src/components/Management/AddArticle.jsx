import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AddArticle = () => {
  const [isAdmin, setIsAdmin] = useState(false); // Vérification de rôle
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [articleData, setArticleData] = useState({
    title: "",
    description: "",
    content: "",
    imageUrl: "", // Pour stocker l'URL manuelle OU celle de Firebase
    tags: "",
    categories: "",
    featured: false,
  });

  useEffect(() => {
    const checkUserRole = async () => {
      auth.onAuthStateChanged(async (currentUser) => {
        if (currentUser) {
          try {
            const userDoc = await getDoc(doc(db, "users", currentUser.uid));
            if (userDoc.exists() && userDoc.data().role === "Administrateur") {
              setIsAdmin(true);
            } else {
              setMessage("Vous n'avez pas l'autorisation d'accéder à cette page.");
            }
          } catch (error) {
            console.error("Erreur lors de la vérification du rôle :", error);
            setMessage("Erreur lors de la vérification de vos permissions.");
          }
        } else {
          setMessage("Veuillez vous connecter pour accéder à cette page.");
        }
      });
    };

    checkUserRole();
  }, []);

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

    if (!articleData.title || !articleData.description || !articleData.content) {
      setMessage("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    try {
      setUploading(true);
      let finalImageUrl = articleData.imageUrl; // On garde l'URL si elle est fournie

      if (image) {
        const storage = getStorage();
        const storageRef = ref(storage, `articles/${image.name}`);
        await uploadBytes(storageRef, image);
        finalImageUrl = await getDownloadURL(storageRef); // Remplace l’URL manuelle par l’URL Firebase
      }

      const articlesRef = collection(db, "articles");
      const newArticle = {
        ...articleData,
        imageUrl: finalImageUrl, // Soit URL manuelle, soit URL Firebase
        tags: articleData.tags.split(",").map((tag) => tag.trim()),
        categories: articleData.categories.split(",").map((cat) => cat.trim()),
        date: new Date(),
      };

      await addDoc(articlesRef, newArticle);
      setMessage("Article ajouté avec succès !");
      setArticleData({
        title: "",
        description: "",
        content: "",
        imageUrl: "",
        tags: "",
        categories: "",
        featured: false,
      });
      setImage(null);
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'article :", error);
      setMessage("Une erreur est survenue lors de l'ajout de l'article.");
    } finally {
      setUploading(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <p className="text-red-500 font-semibold">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-36 mt-8 justify-center bg-white shadow-lg p-6 rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Ajouter un article</h1>
      {message && <p className="text-center text-green-600 mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-gray-700">Titre</label>
          <input
            type="text"
            name="title"
            value={articleData.title}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Titre de l'article"
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
            placeholder="Courte description"
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
            placeholder="Contenu de l'article"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700">Télécharger une image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full border rounded px-3 py-2"
            accept="image/*"
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700">OU entrer une URL d'image</label>
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
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={uploading}
        >
          {uploading ? "Ajout en cours..." : "Ajouter l'article"}
        </button>
      </form>
    </div>
  );
};

export default AddArticle;
