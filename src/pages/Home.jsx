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
    <div className="flex flex-col min-h-screen">
      {showQuestionnaire ? (
        <Questionnaire onRestart={handleRestart} />
      ) : (
        <IntroSection onLaunch={handleStart} />
      )}
    </div>
  );
};

export default Home;
