import React, { useState } from "react";
import { Link } from "react-router-dom";
import ModaleAuth from "./ModaleAuth"; // Assurez-vous que ModaleAuth est dans le bon dossier

export default function NavBar() {
  const [showModal, setShowModal] = useState(false); // Gestion de l'état de la modale

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

        {/* Bouton pour la modale */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={() => setShowModal(true)} // Ouvrir la modale
            className="font-mono bg-blue-800 text-white py-2 px-4 hover:bg-gray-700 transition duration-300"
          >
            Inscription / Connexion
          </button>
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
