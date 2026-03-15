import React, { useState } from "react";
import img15 from '../assets/images/img15.jpg';
import img16 from '../assets/images/img16.jpg';

const Question9 = ({ onNext, onPrevious }) => {
  const [selectedUsage, setSelectedUsage] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (selectedUsage) {
      onNext({ usage: selectedUsage });
    } else {
      setError("Veuillez sélectionner un type d'usage.");
    }
  };

  return (
    <section className="flex flex-1 items-center justify-center min-h-[calc(100vh-128px)]">
      <div className="flex flex-col items-center max-w-3xl w-full px-6 md:px-12 space-y-8">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-800 text-center">
          Pour quel usage ?
        </h2>

        {/* Options d'usage */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {[
            { label: "Loisir", value: "loisir", img: img15 },
            { label: "Professionnel", value: "pro", img: img16 },
          ].map((option) => (
            <button
              key={option.value}
              className={`group relative block overflow-hidden shadow-lg ${
                selectedUsage === option.value ? "border-2 border-blue-800" : ""
              }`}
              onClick={() => {
                setSelectedUsage(option.value);
                setError(""); // Réinitialise le message d'erreur
              }}
              aria-pressed={selectedUsage === option.value}
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
            PrécédentB
          </button>
          <button
            className="bg-blue-800 text-white px-6 py-2 shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out"
            onClick={handleSubmit}
          >
            Valider
          </button>
        </div>
      </div>
    </section>
  );
};

export default Question9;
