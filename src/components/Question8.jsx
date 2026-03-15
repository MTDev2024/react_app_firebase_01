import React, { useState } from "react";
import img13 from '../assets/images/img13.jpg';
import img14 from '../assets/images/img14.jpg';

const Question8 = ({ onNext, onPrevious }) => {
  const [selectedMobility, setSelectedMobility] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (selectedMobility) {
      onNext({ mobility: selectedMobility });
    } else {
      setError("Veuillez sélectionner une option de mobilité.");
    }
  };

  return (
    <section className="flex flex-1 items-center justify-center min-h-[calc(100vh-128px)]">
      <div className="flex flex-col items-center max-w-3xl w-full px-6 md:px-12 space-y-8">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-800 text-center">
          Prenez-vous les transports en commun avec votre trottinette ? Avez vous besoin de pouvoir l'emmener dans votre voiture ?
        </h2>

        {/* Options de mobilité */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {[
            { label: "Non", value: "Non", img: img13 },
            { label: "Oui", value: "Oui", img: img14 },
          ].map((option) => (
            <button
              key={option.value}
              className={`group relative block overflow-hidden shadow-lg ${
                selectedMobility === option.value ? "border-2 border-blue-800" : ""
              }`}
              onClick={() => {
                setSelectedMobility(option.value);
                setError(""); // Réinitialise le message d'erreur
              }}
              aria-pressed={selectedMobility === option.value}
            >
              <img
                src={option.img}
                alt={`Option ${option.label}`}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gray-900 bg-opacity-10 flex items-center justify-center">
                <h3 className="text-white text-2xl font-semibold">{option.label}</h3>
              </div>
            </button>
          ))}
        </div>

        {/* Message d'erreur */}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

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
          >
            Suivant
          </button>
        </div>
      </div>
    </section>
  );
};

export default Question8;
