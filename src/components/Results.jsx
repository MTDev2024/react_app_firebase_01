import React from "react";
import trottinettes from "../data/trottinettes";

const Results = ({ answers, onRestart }) => {
  // Filtrer les résultats en fonction des réponses
  const filteredResults = trottinettes.filter((trottinette) => {
    // Vérifier la correspondance du type de trajet
    const trajetMatch = answers.type_trajet.length
      ? answers.type_trajet.some((type) =>
          trottinette.type_trajet.includes(type)
        )
      : true; // Si aucun filtre, accepter tout.

    // Vérifier la correspondance du type de relief
    const reliefMatch = answers.relief.length
      ? answers.relief.some((type) => trottinette.relief.includes(type))
      : true;

    // Vérifier la distance maximale
    const distanceMatch =
      answers.distance === null || trottinette.distance_max >= answers.distance;

    // Vérifier le poids maximal supporté
    const weightMatch =
      answers.weight === null || trottinette.poids_max >= answers.weight;

    // Vérifier le prix maximal
    const priceMatch =
      answers.price === null || trottinette.prix <= answers.price;

    // Vérifier si toutes les conditions sont remplies
    return (
      trajetMatch &&
      reliefMatch &&
      distanceMatch &&
      weightMatch &&
      priceMatch
    );
  });

  // Débogage : Afficher les réponses et les résultats
  console.log("Réponses utilisateur :", answers);
  console.log("Résultats filtrés :", filteredResults);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold">Résultats</h2>
      {filteredResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredResults.map((trottinette, index) => (
            <div
              key={index}
              className="p-4 border shadow-md bg-white flex flex-col items-center"
            >
              <h3 className="font-bold text-lg text-center mb-2">
                {trottinette.modele}
              </h3>
              <img
                src={trottinette.image}
                alt={trottinette.modele}
                className="w-full h-auto mb-4"
              />
              <p>
                <strong>Autonomie :</strong> {trottinette.distance_max} km
              </p>
              <p>
                <strong>Prix :</strong> {trottinette.prix} €
              </p>
              <p>
                <strong>Poids maximal :</strong> {trottinette.poids_max} kg
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-red-600 font-bold">
          Aucun modèle ne correspond à vos critères. Veuillez essayer à nouveau
          avec des critères différents.
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
