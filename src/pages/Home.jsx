import React from "react";
import IntroSection from "../components/IntroSection";
import Questionnaire from "../components/Questionnaire";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Section d'introduction */}
      <IntroSection />

      {/* Section du questionnaire */}
      <Questionnaire />
    </div>
  );
};

export default Home;
