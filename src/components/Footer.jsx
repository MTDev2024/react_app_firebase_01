import React from "react";
import { Link } from "react-router-dom";


export default function Footer() {
  return (
    <footer className="bg-blue-800 text-white w-full py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        {/* Texte Footer */}
        <div className="text-sm text-center md:text-left">
          &copy; 2024 Trotticompv3. Tous droits réservés.
        </div>

        {/* Footer Links */}
        <div className="mt-4 md:mt-0 flex space-x-4">
          <Link
            to="/politique-confidentialite"
            className="text-gray-400 hover:text-white"
            title="Voir notre politique de confidentialité"
            aria-label="Voir notre politique de confidentialité"
          >
            Politique de confidentialité
          </Link>

          <Link
            to="/conditions-utilisation"
            className="text-gray-400 hover:text-white"
            title="Voir les conditions d'utilisation"
            aria-label="Voir les conditions d'utilisation"
          >
            Conditions d'utilisation
          </Link>

          <Link
            to="/mentions-legales"
            className="text-gray-400 hover:text-white"
            title="Voir les mentions légales"
            aria-label="Voir les mentions légales"
          >
            Mentions légales
          </Link>
        </div>
      </div>
    </footer>
  );
}
