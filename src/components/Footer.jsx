import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-blue-800 text-white w-full py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Texte Footer */}
        <div className="text-sm text-center md:text-left">
          &copy; 2024 Trotticomp. Tous droits réservés.
        </div>

        {/* Footer Links */}
        <div className="mt-4 md:mt-0 flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
          <Link
            to="/politique-confidentialite"
            className="text-gray-400 hover:text-white"
            title="Voir notre politique de confidentialité"
            aria-label="Voir notre politique de confidentialité"
          >
            Politique de confidentialité
          </Link>

          <Link
            to="/cgu"
            className="text-gray-400 hover:text-white"
            title="Voir les conditions générales d'utilisation"
            aria-label="Voir les conditions générales d'utilisation"
          >
            Conditions générales d'utilisation
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
