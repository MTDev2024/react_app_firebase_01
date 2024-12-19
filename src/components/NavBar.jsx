import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Import centralisé des services Firebase
import { auth } from "../firebase.js";
import { onAuthStateChanged } from "firebase/auth";

// Import du composant ModaleAuth
import ModaleAuth from "./ModaleAuth.jsx"; // Modale d'authentification

export default function NavBar() {
  const [showModal, setShowModal] = useState(false); // État pour afficher/masquer la modale
  const [user, setUser] = useState(null); // État pour l'utilisateur connecté
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // État du dropdown (menu utilisateur)
  const [isMenuOpen, setIsMenuOpen] = useState(false); // État du menu hamburger (mobile)
  const navigate = useNavigate(); // Navigation avec React Router

  // 1. Gestion de l'état d'authentification
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Met à jour l'utilisateur lorsque son état change
    });

    // Nettoyage lors du démontage du composant
    return () => unsubscribe();
  }, []);

  // 2. Fonction de déconnexion
  const handleLogout = async () => {
    try {
      await auth.signOut();
      setIsDropdownOpen(false); // Ferme le dropdown après la déconnexion
      navigate("/"); // Redirige vers la page d'accueil
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  // 3. Fermer le dropdown si l'utilisateur clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown")) {
        setIsDropdownOpen(false); // Ferme le dropdown si clic extérieur
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-lg w-full">
      {/* Conteneur principal pour la navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo du site */}
        <Link to="/" className="text-2xl font-bold text-blue-800">
        Compv3
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

        {/* Section utilisateur : Dropdown ou bouton de connexion */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            // Si l'utilisateur est connecté
            <div className="relative dropdown">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Ouvre/ferme le dropdown
                className="flex items-center gap-2 bg-blue-800 text-white py-2 px-4 rounded hover:bg-gray-700"
              >
                <img
                  src="/assets/icons/male_female_users.svg"
                  alt="Icone de profil"
                  className="h-8 w-8 object-cover shadow-lg rounded-full"
                />
                <span>Mon compte</span>
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown : Liens et actions utilisateur */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-50">
                  <ul className="py-2">
                    <li>
                      <button
                        onClick={() => navigate("/favorites")} // Redirige vers la page des favoris
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Mes favoris
                      </button>
                    </li>
                    <li>
                      <p className="block w-full text-left px-4 py-2 text-gray-500 truncate">
                        {user.email} {/* Affiche l'adresse email */}
                      </p>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout} // Gère la déconnexion
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                      >
                        Déconnexion
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            // Si aucun utilisateur connecté : Bouton d'inscription/connexion
            <button
              onClick={() => setShowModal(true)} // Ouvre la modale
              className="font-mono bg-blue-800 text-white py-2 px-4 hover:bg-gray-700 transition duration-300 flex items-center gap-2 rounded"
            >
              <img
                src="/assets/icons/male_female_users.svg"
                alt="Icone de profil"
                className="h-6 w-6 object-cover shadow-lg rounded-full"
              />
              Inscription / Connexion
            </button>
          )}
        </div>

        {/* Menu hamburger pour mobile */}
        <button
          className="md:hidden flex items-center text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)} // Ouvre/ferme le menu
        >
          <svg
            className="w-8 h-8"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Navigation mobile (visible lorsque le menu hamburger est ouvert) */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white shadow-lg">
          <ul className="space-y-4 px-4 py-2">
            <li>
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-800"
                onClick={() => setIsMenuOpen(false)} // Ferme le menu après clic
              >
                Accueil
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className="text-gray-700 hover:text-blue-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="/apropos"
                className="text-gray-700 hover:text-blue-800"
                onClick={() => setIsMenuOpen(false)}
              >
                À propos
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-blue-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <button
                    onClick={() => {
                      navigate("/favorites"); // Redirige vers la page des favoris
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left text-gray-700 hover:text-blue-800"
                  >
                    Mes favoris
                  </button>
                </li>
                <li>
                  <p className="text-gray-500 truncate">{user.email}</p>
                </li>
                <li>
                  <button
                    onClick={handleLogout} // Gère la déconnexion
                    className="w-full text-left text-red-600 hover:text-red-800"
                  >
                    Déconnexion
                  </button>
                </li>
              </>
            ) : (
              <li>
                <button
                  onClick={() => setShowModal(true)} // Ouvre la modale
                  className="w-full text-left text-gray-700 hover:text-blue-800"
                >
                  Inscription / Connexion
                </button>
              </li>
            )}
          </ul>
        </nav>
      )}

      {/* Modale d'authentification */}
      {showModal && (
        <ModaleAuth
          show={showModal}
          onClose={() => setShowModal(false)} // Ferme la modale
        />
      )}
    </header>
  );
}
