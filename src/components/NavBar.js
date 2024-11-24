import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Importer Firebase Auth pour gérer l'authentification
import ModaleAuth from "./ModaleAuth"; // Modale d'authentification

export default function NavBar() {
  const [showModal, setShowModal] = useState(false); // État de la modale
  const [user, setUser] = useState(null); // État de l'utilisateur connecté
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // État du dropdown
  const [isMenuOpen, setIsMenuOpen] = useState(false); // État du menu hamburger (navigation mobile)
  const navigate = useNavigate();

  // Utiliser Firebase pour détecter les changements d'état de l'utilisateur connecté
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Met à jour l'utilisateur lorsque la connexion change
    });

    // Nettoyer l'écouteur lors du démontage du composant
    return () => unsubscribe();
  }, []);

  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    const auth = getAuth();
    auth.signOut().then(() => {
      setIsDropdownOpen(false); // Fermer le dropdown après déconnexion
      navigate("/"); // Rediriger vers la page d'accueil
    });
  };

  // Fermer le dropdown si l'utilisateur clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Vérifie si le clic est à l'extérieur du dropdown
      if (!event.target.closest(".dropdown")) {
        setIsDropdownOpen(false); // Ferme le dropdown
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-lg w-full">
      {/* Conteneur principal pour la navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        
        {/* Logo de la navbar */}
        <Link to="/" className="text-2xl font-bold text-blue-800">
          Trotticompv3
        </Link>

        {/* Navigation Desktop (visible uniquement sur les écrans moyens et grands) */}
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

        {/* Section utilisateur : Authentification ou Dropdown "Mon compte" */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            // Si un utilisateur est connecté
            <div className="relative dropdown">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Gère l'ouverture/fermeture du dropdown
                className="flex items-center gap-2 bg-blue-800 text-white py-2 px-4 rounded hover:bg-gray-700"
              >
                <img
                  src="/assets/icons/male_female_users.svg"
                  alt="Icone de profil"
                  className="h-8 w-8 object-cover shadow-lg rounded-full"
                />
                <span>Mon compte</span> {/* Affiche uniquement "Mon compte" */}
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`} // Ajoute une rotation pour indiquer l'état du dropdown
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

              {/* Dropdown menu pour les actions de l'utilisateur */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-50">
                  <ul className="py-2">
                    <li>
                      <button
                        onClick={() => navigate("/favorites")} // Redirige vers les favoris
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Mes favoris
                      </button>
                    </li>
                    <li>
                      <p className="block w-full text-left px-4 py-2 text-gray-500 truncate">
                        {user.email} {/* Affiche l'email dans le menu */}
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
            // Si aucun utilisateur connecté : bouton pour ouvrir la modale
            <button
              onClick={() => setShowModal(true)}
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

        {/* Menu compact (hamburger) pour mobile */}
        <button
          className="md:hidden flex items-center text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
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

      {/* Navigation mobile (visible uniquement lorsque le menu hamburger est ouvert) */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white shadow-lg">
          <ul className="space-y-4 px-4 py-2">
            <li>
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-800"
                onClick={() => setIsMenuOpen(false)}
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
                      navigate("/favorites");
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
                    onClick={handleLogout}
                    className="w-full text-left text-red-600 hover:text-red-800"
                  >
                    Déconnexion
                  </button>
                </li>
              </>
            ) : (
              <li>
                <button
                  onClick={() => setShowModal(true)}
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
