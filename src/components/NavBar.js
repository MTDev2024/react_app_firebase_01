import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Importer Firebase Auth
import ModaleAuth from "./ModaleAuth"; // Assurez-vous que ModaleAuth est dans le bon dossier

export default function NavBar() {
  const [showModal, setShowModal] = useState(false); // Gestion de l'état de la modale
  const [user, setUser] = useState(null); // État pour savoir si un utilisateur est connecté

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Mettre à jour l'utilisateur lorsqu'il se connecte ou se déconnecte
    });

    return () => unsubscribe(); // Nettoyer l'écouteur
  }, []);

  return (
    <header className="bg-white shadow-lg w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-800">
          Trotticompv3
        </Link>

        {/* Navigation Desktop */}
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="text-gray-700 hover:text-blue-800">
            Accueil
          </Link>
          <Link to="/blog" className="text-gray-700 hover:text-blue-800">
            Blog
          </Link>
          <Link to="/apropos" className="text-gray-700 hover:text-blue-800">
            À propos
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-800">
            Contact
          </Link>
        </nav>

        {/* Bouton d'authentification ou Mon profil */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            // Si l'utilisateur est connecté, afficher "Mon profil"
            <Link
              to="/profil"
              className="font-mono bg-blue-800 text-white py-2 px-4 hover:bg-gray-700 transition duration-300"
            >
              Mon profil
            </Link>
          ) : (
            // Si aucun utilisateur connecté, afficher "Inscription / Connexion"
            <button
              onClick={() => setShowModal(true)} // Ouvrir la modale
              className="font-mono bg-blue-800 text-white py-2 px-4 hover:bg-gray-700 transition duration-300"
            >
              Inscription / Connexion
            </button>
          )}
        </div>
      </div>

      {/* Modale d'authentification */}
      {showModal && (
        <ModaleAuth
          show={showModal}
          onClose={() => setShowModal(false)} // Fermer la modale
        />
      )}
    </header>
  );
}
