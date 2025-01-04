import React, { useState } from "react";
import img09 from '../assets/images/img09.jpg';

const Question6 = ({ onNext, onPrevious }) => {
  const [budget, setBudget] = useState(5000); // Valeur par défaut
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (budget >= 0 && budget <= 9990) {
      onNext({ budget });
    } else {
      setError("Veuillez sélectionner un budget valide.");
    }
  };

  return (
    <section className="flex flex-1 items-center justify-center min-h-[calc(100vh-128px)]">
      <div className="flex flex-col md:flex-row items-center max-w-3xl w-full px-6 md:px-12 space-y-8 md:space-y-0 md:space-x-8">
        {/* Image */}
        <div className="w-full md:w-1/2 h-64 md:h-80">
          <img
            src={img09}
            alt="Quel est votre budget ?"
            className="h-full w-full object-cover shadow-lg rounded"
          />
        </div>

        {/* Contenu texte et curseur */}
        <div className="flex flex-col items-center md:items-start w-full md:w-1/2 text-center md:text-left space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-800">
            Quel est votre budget ?
          </h2>

          {/* Curseur */}
          <input
            type="range"
            id="price"
            min="0"
            max="9990"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="w-full mt-4 appearance-none bg-gray-300 rounded-full h-2 focus:outline-none focus:ring focus:ring-blue-300"
            aria-label="Sélectionner votre budget en euros"
          />

          {/* Plage de valeurs et budget sélectionné */}
          <div className="flex justify-between w-full mt-2 text-sm text-gray-600">
            <span>0 €</span>
            <span>9990 €</span>
          </div>
          <span className="text-blue-600 text-xl font-bold mt-2 py-1 border border-blue-500 rounded text-center w-24">
            {budget} €
          </span>

          {/* Message d'erreur */}
          {error && <p className="text-red-500 mt-2">{error}</p>}

          {/* Boutons de navigation */}
          <div className="flex space-x-4 mt-4">
            <button
              className="bg-gray-500 text-white px-6 py-2 shadow-lg hover:bg-gray-700 transition duration-300 ease-in-out"
              onClick={onPrevious}
            >
              Précédent
            </button>
            <button
              className="bg-blue-800 text-white px-6 py-2 shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out"
              onClick={handleSubmit}
              aria-label="Passer à la question suivante"
            >
              Suivant
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Question6;
