import React, { useState } from "react";
import img04 from '../assets/images/img04.jpg'
import img05 from '../assets/images/img05.jpg'

const Question4 = ({ onNext }) => {
  const [selectedTrajets, setSelectedTrajets] = useState([]);

  const toggleTrajet = (value) => {
    if (selectedTrajets.includes(value)) {
      setSelectedTrajets(selectedTrajets.filter((item) => item !== value));
    } else {
      setSelectedTrajets([...selectedTrajets, value]);
    }
  };

  const handleSubmit = () => {
    if (selectedTrajets.length > 0) {
      onNext({ type_trajet: selectedTrajets });
    } else {
      alert("Veuillez sélectionner au moins un type de trajet.");
    }
  };

  return (
    <section className="flex flex-1 items-center justify-center min-h-[calc(100vh-128px)]">
      <div className="flex flex-col items-center max-w-3xl w-full px-6 md:px-12 space-y-8">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-800 text-center">
          Type de trajets ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <button
            className={`group relative block overflow-hidden shadow-lg ${
              selectedTrajets.includes("route") ? "border-2 border-blue-800" : ""
            }`}
            onClick={() => toggleTrajet("route")}
          >
            <img
              src={img04}
              alt="Route"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gray-900 bg-opacity-10 flex items-center justify-center">
              <h3 className="text-white text-2xl font-semibold">Route</h3>
            </div>
          </button>
          <button
            className={`group relative block overflow-hidden shadow-lg ${
              selectedTrajets.includes("chemin")
                ? "border-2 border-blue-800"
                : ""
            }`}
            onClick={() => toggleTrajet("chemin")}
          >
            <img
              src={img05}
              alt="Chemin"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gray-900 bg-opacity-10 flex items-center justify-center">
              <h3 className="text-white text-2xl font-semibold">Chemin</h3>
            </div>
          </button>
        </div>
        <div className="flex justify-center w-full">
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

export default Question4;
