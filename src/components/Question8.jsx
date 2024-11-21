import React, { useState } from "react";

const Question8 = ({ onNext }) => {
  const [selectedMobility, setSelectedMobility] = useState(null);

  const handleSubmit = () => {
    if (selectedMobility) {
      onNext({ mobility: selectedMobility });
    } else {
      alert("Veuillez sélectionner une option de mobilité.");
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center max-w-3xl w-full px-6 md:px-12 space-y-8">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-800 text-center">
          Prenez-vous les transports en commun avec votre trottinette ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {[
            {
              label: "Non",
              value: "Non",
              img: "/assets/images/no-transp-pexels-denniz-futalan-339724-1379374.jpg",
            },
            {
              label: "Oui",
              value: "Oui",
              img: "/assets/images/tram-aoi-yxV0sSwhWgw-unsplash.jpg",
            },
          ].map((option) => (
            <button
              key={option.value}
              className={`group relative block overflow-hidden shadow-lg ${
                selectedMobility === option.value ? "border-2 border-blue-800" : ""
              }`}
              onClick={() => setSelectedMobility(option.value)}
            >
              <img
                src={option.img}
                alt={option.label}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gray-900 bg-opacity-10 flex items-center justify-center">
                <h3 className="text-white text-2xl font-semibold">{option.label}</h3>
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

export default Question8;
