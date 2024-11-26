import React, { useState } from "react";
import img09 from '../assets/images/img09.jpg'

const Question6 = ({ onNext }) => {
  const [budget, setBudget] = useState(5000); // Valeur par défaut

  const handleSubmit = () => {
    onNext({ budget });
  };

  return (
    <section className="flex flex-1 items-center justify-center min-h-[calc(100vh-128px)]">
      <div className="flex flex-col md:flex-row items-center max-w-3xl w-full px-6 md:px-12 space-y-8 md:space-y-0 md:space-x-8">
        <div className="w-full md:w-1/2 h-64 md:h-80">
          <img src={img09} alt="budget"
            className="h-full w-full object-cover shadow-lg"
          />
        </div>
        <div className="flex flex-col items-center md:items-start w-full md:w-1/2 text-center md:text-left space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-800">
            Quel est votre budget ?
          </h2>
          <input
            type="range"
            id="price"
            min="0"
            max="9990"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full mt-4 appearance-none bg-gray-300 rounded-full h-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
          <div className="flex justify-between w-full mt-2">
            <span className="text-blue-600 font-semibold">0 €</span>
            <span className="text-blue-600 font-semibold">9990 €</span>
          </div>
          <span className="text-blue-600 text-xl font-bold mt-2 py-1 border border-blue-500 rounded text-center w-24">
            {budget} €
          </span>
          <button
            className="bg-blue-800 text-white font-mono px-6 py-2 shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out"
            onClick={handleSubmit}
          >
            Suivant
          </button>
        </div>
      </div>
    </section>
  );
};

export default Question6;
