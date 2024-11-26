import React, { useState } from "react";
import IntroSection from "../components/IntroSection";
import Questionnaire from "../components/Questionnaire";

const Home = () => {
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);

  const handleStart = () => {
    setShowQuestionnaire(true); // Affiche le questionnaire lorsque le bouton "Commencer" est cliqué
  };

  const handleRestart = () => {
    setShowQuestionnaire(false); // Réinitialise pour revenir à l'intro
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
