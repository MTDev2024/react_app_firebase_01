import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import trottinettes from "../data/trottinettes";
import Card from "./Card";

const Results = ({ onRestart }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Récupère les réponses à partir de l'état passé via la navigation
  const answers = location.state?.answers;

  // Initialisation des Hooks en dehors de toute condition
  const [selectedScooters, setSelectedScooters] = useState([]);

  // Vérifie si `answers` est `undefined`, et renvoie un message d'erreur si nécessaire
  if (!answers) {
    return (
      <div className="text-center text-red-600 font-bold">
        Aucune donnée de questionnaire disponible. Veuillez recommencer.
      </div>
    );
  }

  // Filtrer les résultats en fonction des réponses du questionnaire
  const filteredResults = trottinettes.filter((trottinette) => {
    const trajetMatch = answers.type_trajet.length
      ? answers.type_trajet.some((type) =>
          trottinette.type_trajet.includes(type)
        )
      : true;

    const reliefMatch = answers.relief.length
      ? answers.relief.some((type) => trottinette.relief.includes(type))
      : true;

    const distanceMatch =
      answers.distance === null || trottinette.distance_max >= answers.distance;
    const weightMatch =
      answers.weight === null || trottinette.poids_max >= answers.weight;
    const priceMatch =
      answers.price === null || trottinette.prix <= answers.price;

    return trajetMatch && reliefMatch && distanceMatch && weightMatch && priceMatch;
  });

  const handleSelectScooter = (id) => {
    setSelectedScooters((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((scooterId) => scooterId !== id);
      } else if (prevSelected.length < 3) {
        return [...prevSelected, id];
      }
      return prevSelected;
    });
  };

  const handleCompare = () => {
    // Redirige vers la page de comparaison avec les trottinettes sélectionnées
    const scootersToCompare = filteredResults.filter((trottinette) =>
      selectedScooters.includes(trottinette.itemID)
    );
    navigate("/compare", { state: { selectedScooters: scootersToCompare } });
  };

  return (
    <div className="px-4 mx-30">
      <h2 className="text-4xl text-center mb-8 text-blue-800 my-6 font-bold">
        Résultats
      </h2>
      {filteredResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredResults.map((trottinette) => (
            <Card
              key={trottinette.itemID}
              trottinette={trottinette}
              isSelected={selectedScooters.includes(trottinette.itemID)}
              onSelect={handleSelectScooter}
              disableSelect={
                selectedScooters.length >= 3 &&
                !selectedScooters.includes(trottinette.itemID)
              }
            />
          ))}
        </div>
      ) : (
        <p className="text-red-600 font-bold">
          Aucun modèle ne correspond à vos critères. Veuillez essayer à nouveau
          avec des critères différents.
        </p>
      )}
   
    <button
        onClick={handleCompare}
        disabled={selectedScooters.length < 2}
        className="mt-6 mb-6 mr-4 bg-blue-600 text-white py-2 px-4 disabled:bg-gray-400"
      >
        Comparer
      </button>
      <button
        className="mt-6 mb-6 bg-blue-600 text-white py-2 px-4"
        onClick={onRestart}
      >
        Recommencer
      </button>
    
    </div>
  );
};

export default Results;
