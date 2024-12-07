import React, { useState } from "react";
import IntroSection from "../components/IntroSection";
import Questionnaire from "../components/Questionnaire";

const Home = () => {
  // État pour afficher soit l'intro, soit le questionnaire
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);

  // Fonction pour lancer le questionnaire
  const handleStart = () => {
    setShowQuestionnaire(true); // Affiche le questionnaire
  };

  // Fonction pour réinitialiser et revenir à l'intro
  const handleRestart = () => {
    setShowQuestionnaire(false); // Réinitialise l'état
  };

  return (
    <div className="flex-grow flex flex-col">
      {showQuestionnaire ? (
        <Questionnaire onRestart={handleRestart} />
      ) : (
        <IntroSection onLaunch={handleStart} />
      )}
    </div>
  );
};

export default Home;
