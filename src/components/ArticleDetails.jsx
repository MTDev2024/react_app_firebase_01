import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const ArticleDetails = () => {
  const { slug } = useParams(); // Récupération du slug de l'URL
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const articleRef = doc(db, "articles", slug); // Recherche par slug
        const articleSnap = await getDoc(articleRef);
        if (articleSnap.exists()) {
          setArticle(articleSnap.data());
        } else {
          console.error("Article non trouvé !");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'article :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) return <p className="text-center">Chargement...</p>;
  if (!article) return <p className="text-center text-red-500">Article introuvable.</p>;

  // Vérification et formatage de la date
  const formattedDate = article.date?.toDate
    ? article.date.toDate().toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Date inconnue";

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800">{article.title}</h1>
      <p className="text-gray-500 text-sm mt-2">Publié le {formattedDate}</p>

      {/* Image de l'article */}
      {article.imageUrl ? (
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-64 object-cover mt-4 rounded-lg shadow"
        />
      ) : (
        <div className="w-full h-64 flex items-center justify-center bg-gray-200 mt-4 rounded-lg">
          <p className="text-gray-500">Aucune image disponible</p>
        </div>
      )}

      {/* Contenu de l'article */}
      <p className="text-gray-700 mt-4 whitespace-pre-line">{article.content}</p>

      {/* Tags */}
      {article.tags && article.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {article.tags.map((tag, index) => (
            <span
              key={index}
              className="text-sm bg-gray-200 text-gray-800 px-2 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Bouton Retour */}
      <div className="mt-6">
        <Link
          to="/blog"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Retour au blog
        </Link>
      </div>
    </div>
  );
};

export default ArticleDetails;
