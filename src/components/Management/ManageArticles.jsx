import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import AddArticle from "./AddArticle";
import ArticleCard from "../ArticleCard";

const ManageArticle = () => {
  const [articles, setArticles] = useState([]); // Liste des articles
  const [loading, setLoading] = useState(true); // Indicateur de chargement
  const [isAdmin, setIsAdmin] = useState(false); // Vérification si l'utilisateur est admin
  const [message, setMessage] = useState(""); // Message de confirmation ou d'erreur

  // Vérification du rôle utilisateur
  useEffect(() => {
    const checkUserRole = async () => {
      auth.onAuthStateChanged(async (currentUser) => {
        if (currentUser) {
          try {
            const userDoc = await getDoc(doc(db, "users", currentUser.uid));
            if (userDoc.exists() && userDoc.data().role === "Administrateur") {
              setIsAdmin(true); // L'utilisateur est un administrateur
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

  // Récupération des articles depuis Firestore
  useEffect(() => {
    const fetchArticles = async () => {
      if (isAdmin) {
        try {
          const articlesSnapshot = await getDocs(collection(db, "articles"));
          const articlesData = articlesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setArticles(articlesData); // Mise à jour de la liste des articles
        } catch (error) {
          console.error("Erreur lors du chargement des articles :", error);
          setMessage("Impossible de charger les articles.");
        } finally {
          setLoading(false); // Fin du chargement
        }
      }
    };

    fetchArticles();
  }, [isAdmin]);

  // Suppression d'un article
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "articles", id));
      setArticles(articles.filter((article) => article.id !== id)); // Mise à jour de la liste
      setMessage("Article supprimé avec succès.");
    } catch (error) {
      console.error("Erreur lors de la suppression de l'article :", error);
      setMessage("Une erreur est survenue lors de la suppression.");
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
    <div className="w-full mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Gestion des articles</h1>
      {message && <p className="text-center text-green-600 mb-4">{message}</p>}

      {/* Formulaire pour ajouter un article */}
      <AddArticle />

      {/* Liste des articles */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Articles existants</h2>
        {loading ? (
          <p>Chargement des articles...</p>
        ) : articles.length === 0 ? (
          <p>Aucun article disponible pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <div key={article.id} className="relative">
                <ArticleCard article={article} />
                {/* Bouton pour supprimer un article */}
                <button
                  onClick={() => handleDelete(article.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageArticle;
