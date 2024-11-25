import React from "react";
import trottinettes from "../data/trottinettes";
import Card from "./Card"; // Importer le nouveau composant Card

const Results = ({ answers, onRestart }) => {
  // Filtrer les résultats en fonction des réponses
  const filteredResults = trottinettes.filter((trottinette) => {
    const trajetMatch = answers.type_trajet.length
      ? answers.type_trajet.some((type) => trottinette.type_trajet.includes(type))
      : true;

    const reliefMatch = answers.relief.length
      ? answers.relief.some((type) => trottinette.relief.includes(type))
      : true;

    const distanceMatch = answers.distance === null || trottinette.distance_max >= answers.distance;
    const weightMatch = answers.weight === null || trottinette.poids_max >= answers.weight;
    const priceMatch = answers.price === null || trottinette.prix <= answers.price;

    return trajetMatch && reliefMatch && distanceMatch && weightMatch && priceMatch;
  });

  console.log("Réponses utilisateur :", answers);
  console.log("Résultats filtrés :", filteredResults);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold">Résultats</h2>
      {filteredResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredResults.map((trottinette, index) => (
            <Card key={index} trottinette={trottinette} />
          ))}
        </div>
      ) : (
        <p className="text-red-600 font-bold">
          Aucun modèle ne correspond à vos critères. Veuillez essayer à nouveau avec des critères différents.
        </p>
      )}
      <button
        className="mt-4 bg-blue-600 text-white py-2 px-4"
        onClick={onRestart}
      >
        Recommencer
      </button>
    </div>
  );
};

export default Results;
