import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase.js";
import ModaleAuth from "./ModaleAuth.jsx";
import useStore from "../store/store";

export default function NavBar() {
  const [showModal, setShowModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // On lit directement le store — plus besoin d'écouter Firebase ici
  // App.jsx s'en charge et met à jour le store pour tout le monde
  const { user, isAdmin } = useStore();

  // Ferme le dropdown lorsqu'on clique à l'extérieur
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Gère la déconnexion
  const handleLogout = async () => {
    try {
      await auth.signOut();
      setIsDropdownOpen(false);
      setIsMenuOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <header className="bg-white shadow-lg w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-800">
          Compv3
        </Link>

        {/* Menu hamburger (Mobile) */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-8 h-8"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12" // Croix (fermer)
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16" // Trois lignes (ouvrir)
              />
            )}
          </svg>
        </button>

        {/* Navigation Desktop */}
        <nav className="hidden md:flex space-x-8 items-center">
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
          {isAdmin && (
            <Link
              to="/admin"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Administration
            </Link>
          )}
        </nav>

        {/* Section utilisateur */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="relative dropdown" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
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
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-50">
                  <ul className="py-2">
                    <li>
                      <button
                        onClick={() => navigate("/favorites")}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Mes favoris
                      </button>
                    </li>
                    <li>
                      <p className="block w-full text-left px-4 py-2 text-gray-500 truncate">
                        {user.email}
                      </p>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
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
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-800 text-white py-2 px-4 hover:bg-gray-700 transition duration-300 flex items-center gap-2 rounded"
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
      </div>

      {/* Navigation mobile */}
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
            {isAdmin && (
              <li>
                <Link
                  to="/admin"
                  className="text-blue-800 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Administration
                </Link>
              </li>
            )}
            {user && (
              <li>
                <button
                  onClick={() => {
                    navigate("/favorites");
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-700 hover:text-blue-800"
                >
                  Mes favoris
                </button>
              </li>
            )}
            {user && (
              <li>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-800"
                >
                  Déconnexion
                </button>
              </li>
            )}
            {!user && (
              <li>
                <button
                  onClick={() => {
                    setShowModal(true);
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-700 hover:text-blue-800"
                >
                  Inscription / Connexion
                </button>
              </li>
            )}
          </ul>
        </nav>
      )}

      {/* Modale d'authentification */}
      {showModal && <ModaleAuth show={showModal} onClose={() => setShowModal(false)} />}
    </header>
  );
}
