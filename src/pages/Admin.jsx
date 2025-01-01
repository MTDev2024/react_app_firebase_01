import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase"; // Firebase Auth et Firestore
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

const Admin = () => {
  const [user, setUser] = useState(null); // Utilisateur connecté
  const [isAdmin, setIsAdmin] = useState(false); // Vérification de rôle
  const navigate = useNavigate(); // Pour la navigation

  useEffect(() => {
    const checkAdmin = async () => {
      const currentUser = auth.currentUser;

      if (currentUser) {
        setUser(currentUser); // Définit l'utilisateur connecté
        const userDoc = await getDoc(doc(db, "users", currentUser.uid)); // Vérifie le rôle
        if (userDoc.exists() && userDoc.data().role === "Administrateur") {
          setIsAdmin(true); // L'utilisateur est un admin
        } else {
          navigate("/"); // Redirige vers la page d'accueil si non admin
        }
      } else {
        navigate("/"); // Redirige si aucun utilisateur connecté
      }
    };

    checkAdmin();
  }, [navigate]);

  if (!isAdmin) {
    return (
      <div className="text-center text-red-500 font-bold">
        Accès refusé. Redirection en cours...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">
        Page d'administration
      </h1>
      <p className="text-center text-gray-700 mb-4">
        Bienvenue, {user.email}. Vous êtes connecté en tant qu'administrateur.
      </p>

      {/* Boutons pour les fonctionnalités d'administration */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          onClick={() => navigate("/add-article")} // Redirige vers l'ajout d'article
        >
          Ajouter un article
        </button>
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          onClick={() => navigate("/manage-users")} // Redirige vers la gestion des utilisateurs
        >
          Gérer les utilisateurs
        </button>
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          onClick={() => navigate("/manage-articles")} // Redirige vers la gestion des articles
        >
          Gérer les articles
        </button>
        <button
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          onClick={() => navigate("/add-trottinette")} // Redirige vers l'ajout de trottinettes
        >
          Ajouter une trottinette
        </button>
        <button
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          onClick={() => navigate("/manage-trottinettes")} // Redirige vers la gestion des trottinettes
        >
          Gérer les trottinettes
        </button>
      </div>
    </div>
  );
};

export default Admin;
