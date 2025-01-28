import React from "react";
import { Link } from "react-router-dom";

const EconomyCard = () => {
  return (
    <div className="transform scale-90 md:scale-90 lg:scale-75 flex flex-col md:flex-row bg-white shadow-md rounded-lg overflow-hidden mb-8 mx-auto">
      {/* Image */}
      <div className="w-full md:w-1/3 overflow-hidden"> {/* Ajout overflow-hidden pour contenir l'image */}
  <img
    src="/assets/images/front-view-plants-with-coins-stacked-dirt-banknote.jpg" // Chemin vers l'image
    alt="Calculateur d'économie"
    className="w-full h-full object-cover transform transition-transform duration-300 ease-in-out hover:translate-y-2 hover:scale-105 hover:shadow-lg"
  />
</div>


      {/* Texte */}
      <div className="p-4 md:p-6 flex flex-col justify-center md:w-2/3">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">Calculateur d'économie</h2>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          Découvrez combien vous pouvez économiser en utilisant une trottinette électrique au lieu de votre voiture pour vos trajets quotidiens.
        </p>
        <Link
  to="/calculator"
  className="text-blue-600 font-medium text-sm md:text-base relative transition-transform duration-300 ease-in-out hover:translate-x-2 hover:font-semibold"
>
  Accéder au calculateur →
</Link>

      </div>
    </div>
  );
};

export default EconomyCard;
