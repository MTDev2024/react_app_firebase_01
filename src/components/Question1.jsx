import React, { useState } from "react";
import img01 from '../assets/images/img01.jpg';

const Question1 = ({ onNext, onPrevious }) => {
  const [distance, setDistance] = useState(50); // Distance par défaut

  const handleSubmit = () => {
    if (distance >= 0) {
      onNext({ distance }); // Passe la réponse au composant parent
    } else {
      alert("Veuillez sélectionner une distance.");
    }
  };

  return (
    <section className="flex flex-1 items-center justify-center min-h-[calc(100vh-128px)]">
      <div className="flex flex-col md:flex-row items-center max-w-3xl w-full px-6 md:px-12 space-y-8 md:space-y-0 md:space-x-8">
        {/* Image */}
        <div className="w-full md:w-1/2 h-64 md:h-80">
          <img 
            src={img01}
            alt="Distance quotidienne"
            className="h-full w-full object-cover shadow-lg rounded"
          />
        </div>
        
        {/* Contenu texte et slider */}
        <div className="flex flex-col items-center md:items-start w-full md:w-1/2 text-center md:text-left space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-800">
            Quelle distance parcourez-vous au quotidien ?
          </h2>

          {/* Curseur */}
          <input
            type="range"
            id="distance"
            min="0"
            max="150"
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            className="w-full mt-4 appearance-none bg-gray-300 rounded-full h-2 focus:outline-none focus:ring focus:ring-blue-300"
            aria-label="Sélectionner la distance quotidienne en kilomètres"
          />

          {/* Indications de plage et valeur */}
          <div className="flex justify-between w-full mt-2 text-sm text-gray-600">
            <span>0 km</span>
            <span>+ de 150 km</span>
          </div>
          <span className="text-blue-600 text-xl font-bold mt-2 py-1 border border-blue-500 rounded text-center w-24">
            {distance} km
          </span>

          {/* Message contextuel */}
          {distance === 0 && (
            <p className="text-red-600 text-sm">
              Attention : 0 km signifie une distance très faible.
            </p>
          )}
          {distance === 150 && (
            <p className="text-red-600 text-sm">
              Attention : "+ de 150 km" correspond à des trajets très longs.
            </p>
          )}

          {/* Boutons de navigation */}
          <div className="flex space-x-4 mt-4">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
              onClick={onPrevious}
            >
              Précédent
            </button>
            <button
              className="bg-blue-800 text-white font-mono px-6 py-2 shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out"
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

export default Question1;
