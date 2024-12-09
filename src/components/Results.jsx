import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import trottinettes from "../data/trottinettes";
import Card from "./Card";
import Questionnaire from "../components/Questionnaire";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showQuestionnaire, setShowQuestionnaire] = useState(false); // État pour relancer le questionnaire
  const [selectedScooters, setSelectedScooters] = useState([]); // État pour les trottinettes sélectionnées

  // Récupère les réponses du questionnaire depuis l'état de navigation
  const answers = location.state?.answers;

  // Vérifie si des réponses sont disponibles
  if (!answers) {
    return (
      <div className="text-center text-red-600 font-bold">
        Aucune donnée de questionnaire disponible. Veuillez recommencer.
      </div>
    );
  }

  // Méthode pour relancer le questionnaire
  const handleRestart = () => {
    setShowQuestionnaire(true); // Change l'état pour afficher directement le questionnaire
  };

  // Méthode pour comparer les trottinettes sélectionnées
  const handleCompare = () => {
    const scootersToCompare = trottinettes.filter((trottinette) =>
      selectedScooters.includes(trottinette.itemID)
    );
    navigate("/compare", { state: { selectedScooters: scootersToCompare } });
  };

  // Gestion de la sélection/désélection des trottinettes
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

  // Si `showQuestionnaire` est activé, affiche le questionnaire
  if (showQuestionnaire) {
    return <Questionnaire />;
  }

  // Filtrage des trottinettes selon les réponses du questionnaire
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

  return (
    <div className="px-4 mx-30">
      <h2 className="text-4xl text-center mb-8 text-blue-800 my-6 font-bold">
        Résultats
      </h2>

      {/* Affichage des résultats filtrés */}
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

      <div className="mt-8 flex justify-center space-x-4">
        {/* Bouton Recommencer */}
        <button
          onClick={handleRestart}
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Recommencer
        </button>

        {/* Bouton Comparer */}
        <button
          onClick={handleCompare}
          disabled={selectedScooters.length < 2} // Désactiver si moins de 2 trottinettes sont sélectionnées
          className={`${
            selectedScooters.length < 2 ? "bg-gray-400" : "bg-green-600"
          } text-white px-6 py-3 rounded-md hover:bg-green-700 transition duration-300`}
        >
          Comparer
        </button>
      </div>
    </div>
  );
};

export default Results;
