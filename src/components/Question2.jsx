import React, { useState } from "react";



const Question2 = ({ onNext }) => {
  const [weight, setWeight] = useState(70); // Valeur par défaut

  const handleSubmit = () => {
    onNext({ weight }); // Passe la réponse au composant parent
  };

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col md:flex-row items-center max-w-3xl w-full px-6 md:px-12 space-y-8 md:space-y-0 md:space-x-8">
        <div className="w-full md:w-1/2 h-64 md:h-80">
          <img
            src="/assets/images/fitness-man-holding-weight-scales-showing-thumbs-up.jpg"
            alt="balance"
            className="h-full w-full object-cover shadow-lg"
          />
        </div>
        <div className="flex flex-col items-center md:items-start w-full md:w-1/2 text-center md:text-left space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-800">
            Quel est votre poids ?
          </h2>
          <input
            type="range"
            id="weight"
            min="40"
            max="150"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full mt-4 appearance-none bg-gray-300 rounded-full h-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
          <div className="flex justify-between w-full mt-2">
            <span className="text-blue-600 font-semibold">40 kg</span>
            <span className="text-blue-600 font-semibold">150 kg</span>
          </div>
          <span className="text-blue-600 text-xl font-bold mt-2 py-1 border border-blue-500 rounded text-center w-24">
            {weight} kg
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

export default Question2;
