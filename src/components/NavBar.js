import React, { useState } from "react";
import { Link } from "react-router-dom";
import ModaleAuth from "./ModaleAuth"; // Import correct si ModaleAuth est dans components


export default function NavBar() {
  const [showModal, setShowModal] = useState(false);

  return (
    <header className="bg-white shadow-lg w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <Link to="/home" className="text-2xl font-bold text-blue-800">
          Trotticompv3
        </Link>
        <nav className="hidden md:flex space-x-8">
          <Link to="/home" className="text-gray-700 hover:text-blue-800">Accueil</Link>
          <Link to="/blog" className="text-gray-700 hover:text-blue-800">Blog</Link>
          <Link to="/apropos" className="text-gray-700 hover:text-blue-800">À propos</Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-800">Contact</Link>
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={() => setShowModal(true)}
            className="font-mono bg-blue-800 text-white py-2 px-4 hover:bg-gray-700 transition duration-300"
          >
            Inscription / Connexion
          </button>
        </div>
      </div>

      {/* Modale d'authentification */}
      <ModaleAuth show={showModal} onClose={() => setShowModal(false)} />
    </header>
  );
}
