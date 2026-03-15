import { useState } from "react";
import { db } from "../../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import useStore from "../../store/store";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

// Fonction pour générer un slug à partir du titre
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Remplace les espaces par des tirets
    .replace(/[^a-z0-9-]/g, '') // Supprime les caractères spéciaux
    .replace(/-+/g, '-'); // Remplace plusieurs tirets par un seul
};

const AddArticle = () => {
  // Lecture du store — ProtectedRoute garantit déjà l'accès, mais on garde
  // isAdmin pour les cas où AddArticle est rendu en dehors d'une route protégée
  const { isAdmin } = useStore();
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [slug, setSlug] = useState("");

  const [articleData, setArticleData] = useState({
    title: "",
    description: "",
    content: "",
    imageUrl: "",
    tags: "",
    categories: "",
    featured: false,
  });


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedData = {
      ...articleData,
      [name]: type === "checkbox" ? checked : value,
    };
    setArticleData(updatedData);

    if (name === "title") {
      setSlug(slugify(value)); // Mise à jour en temps réel du slug
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!articleData.title || !articleData.description || !articleData.content) {
      setMessage("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    try {
      setUploading(true);
      let finalImageUrl = articleData.imageUrl;
      
      // Gestion de l'upload de l'image
      if (image) {
        const storage = getStorage();
        const storageRef = ref(storage, `articles/${uuidv4()}-${image.name}`);
        await uploadBytes(storageRef, image);
        finalImageUrl = await getDownloadURL(storageRef);
      }

      let uniqueSlug = slug;
      const docRef = doc(db, "articles", uniqueSlug);
      
      // Vérifier si le slug existe déjà et en générer un unique si nécessaire
      let docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        uniqueSlug = `${slug}-${uuidv4().slice(0, 8)}`;
      }

      const newArticle = {
        ...articleData,
        slug: uniqueSlug,
        imageUrl: finalImageUrl,
        tags: articleData.tags.split(",").map((tag) => tag.trim()),
        categories: articleData.categories.split(",").map((cat) => cat.trim()),
        date: new Date(),
      };

      await setDoc(doc(db, "articles", uniqueSlug), newArticle);
      setMessage(`Article ajouté avec succès ! Slug : ${uniqueSlug}`);
      setArticleData({
        title: "",
        description: "",
        content: "",
        imageUrl: "",
        tags: "",
        categories: "",
        featured: false,
      });
      setSlug("");
      setImage(null);
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'article :", error);
      setMessage("Une erreur est survenue lors de l'ajout de l'article.");
    } finally {
      setUploading(false);
    }
  };

  if (!isAdmin) {
    return <div className="text-center text-red-500">{message}</div>;
  }

  return (
    <div className="w-full mx-auto p-6 max-w-3xl bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Ajouter un article</h1>
      {message && <p className="text-center text-green-600 mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Titre" value={articleData.title} onChange={handleInputChange} required className="w-full border p-2 rounded" />
        <input type="text" name="slug" value={slug} readOnly className="w-full border p-2 rounded bg-gray-200" />
        <textarea name="description" placeholder="Description" value={articleData.description} onChange={handleInputChange} required className="w-full border p-2 rounded" />
        <textarea name="content" placeholder="Contenu" value={articleData.content} onChange={handleInputChange} required className="w-full border p-2 rounded" />
        <input type="file" onChange={handleImageChange} className="w-full border p-2 rounded" accept="image/*" />
        <input type="text" name="imageUrl" placeholder="URL de l'image" value={articleData.imageUrl} onChange={handleInputChange} className="w-full border p-2 rounded" />
        <input type="text" name="tags" placeholder="Tags (séparés par des virgules)" value={articleData.tags} onChange={handleInputChange} className="w-full border p-2 rounded" />
        <input type="text" name="categories" placeholder="Catégories (séparées par des virgules)" value={articleData.categories} onChange={handleInputChange} className="w-full border p-2 rounded" />
        <label className="flex items-center">
          <input type="checkbox" name="featured" checked={articleData.featured} onChange={handleInputChange} className="mr-2" />
          Mettre en avant
        </label>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded" disabled={uploading}>{uploading ? "Ajout en cours..." : "Ajouter l'article"}</button>
      </form>
    </div>
  );
};

export default AddArticle;
