import React, { useState } from "react";
import img06 from '../assets/images/img06.jpg';
import img07 from '../assets/images/img07.jpg';
import img08 from '../assets/images/img08.jpg';

const Question5 = ({ onNext, onPrevious }) => {
  const [selectedReliefs, setSelectedReliefs] = useState([]);
  const [error, setError] = useState("");

  const toggleRelief = (value) => {
    setError(""); // Réinitialise le message d'erreur
    if (selectedReliefs.includes(value)) {
      setSelectedReliefs(selectedReliefs.filter((item) => item !== value));
    } else {
      setSelectedReliefs([...selectedReliefs, value]);
    }
  };

  const handleSubmit = () => {
    if (selectedReliefs.length > 0) {
      onNext({ relief: selectedReliefs });
    } else {
      setError("Veuillez sélectionner au moins un type de relief.");
    }
  };

  return (
    <section className="flex flex-1 items-center justify-center min-h-[calc(100vh-128px)]">
      <div className="flex flex-col items-center max-w-3xl w-full px-6 md:px-12 space-y-8">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-800 text-center">
          Type de relief ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          {["plat", "modere", "pente"].map((relief) => (
            <button
              key={relief}
              className={`group relative block overflow-hidden shadow-lg ${
                selectedReliefs.includes(relief) ? "border-2 border-blue-800" : ""
              }`}
              onClick={() => toggleRelief(relief)}
              aria-pressed={selectedReliefs.includes(relief)}
            >
              <img
                src={
                  relief === "plat"
                    ? img06
                    : relief === "modere"
                    ? img07
                    : img08
                }
                alt={
                  relief === "plat"
                    ? "Relief plat"
                    : relief === "modere"
                    ? "Relief modéré"
                    : "Pentes"
                }
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gray-900 bg-opacity-10 flex items-center justify-center">
                <h3 className="text-white text-2xl font-semibold">
                  {relief === "plat"
                    ? "Plat"
                    : relief === "modere"
                    ? "Modéré"
                    : "Pentes"}
                </h3>
              </div>
            </button>
          ))}
        </div>

        {/* Message d'erreur */}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {/* Boutons de navigation */}
        <div className="flex justify-center space-x-4 w-full mt-4">
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

export default Question5;
