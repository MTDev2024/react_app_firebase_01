import React, { useState } from "react";
import img04 from '../assets/images/img04.jpg'
import img05 from '../assets/images/img05.jpg'

const Question5 = ({ onNext }) => {
  const [selectedReliefs, setSelectedReliefs] = useState([]);

  const toggleRelief = (value) => {
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
      alert("Veuillez sélectionner au moins un type de relief.");
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center">
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
            >
              <img
                src={img04}
                alt={relief}
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
        <button
          className="bg-blue-800 text-white px-6 py-2 shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out"
          onClick={handleSubmit}
        >
          Suivant
        </button>
      </div>
    </section>
  );
};

export default Question5;
