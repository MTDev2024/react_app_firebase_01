import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

// Import centralisé des services Firebase
import { auth, db } from "../firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

// Import du composant ModaleAuth
import ModaleAuth from "./ModaleAuth.jsx"; // Modale d'authentification

export default function NavBar() {
  const [showModal, setShowModal] = useState(false); // État pour afficher/masquer la modale
  const [user, setUser] = useState(null); // État de l'utilisateur connecté
  const [isAdmin, setIsAdmin] = useState(false); // Vérifie si l'utilisateur est admin
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // État pour afficher/masquer le dropdown
  const [isMenuOpen, setIsMenuOpen] = useState(false); // État pour afficher/masquer le menu mobile
  const dropdownRef = useRef(null); // Référence pour détecter les clics à l'extérieur
  const navigate = useNavigate(); // Permet de naviguer entre les pages

  // Gestion de l'état d'authentification
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Vérifie si l'utilisateur est un administrateur
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists() && userDoc.data().role === "Administrateur") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    });

    return () => unsubscribe(); // Nettoie l'écouteur Firebase lors du démontage
  }, []);

  // Gestion du clic à l'extérieur du dropdown pour le fermer
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false); // Ferme le dropdown si le clic est à l'extérieur
      }
    };

    document.addEventListener("mousedown", handleOutsideClick); // Ajoute l'écouteur de clic
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick); // Nettoie l'écouteur
    };
  }, []);

  // Fonction pour gérer la déconnexion de l'utilisateur
  const handleLogout = async () => {
    try {
      await auth.signOut(); // Déconnecte l'utilisateur via Firebase
      setIsDropdownOpen(false); // Ferme le dropdown après déconnexion
      setIsMenuOpen(false); // Ferme le menu mobile
      navigate("/"); // Redirige vers la page d'accueil
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <header className="bg-white shadow-lg w-full">
      {/* Conteneur principal pour la navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-800">
          Compv3
        </Link>

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

        {/* Section utilisateur : Dropdown ou bouton de connexion */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div
              className="relative dropdown"
              ref={dropdownRef} // Référence pour détecter les clics à l'extérieur
            >
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

              {/* Dropdown menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-50">
                  <ul className="py-2">
                    <li>
                      <button
                        onClick={() => {
                          navigate("/favorites");
                          setIsDropdownOpen(false); // Ferme le dropdown après navigation
                        }}
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
            // Si l'utilisateur n'est pas connecté
            <button
              onClick={() => setShowModal(true)} // Ouvre la modale d'inscription
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
      </div>

      {/* Modale d'authentification */}
      {showModal && <ModaleAuth show={showModal} onClose={() => setShowModal(false)} />}
    </header>
  );
}
