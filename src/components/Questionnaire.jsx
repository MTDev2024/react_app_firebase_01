import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importer le hook de navigation
import Question1 from "./Question1";
import Question2 from "./Question2";
import Question3 from "./Question3";
import Question4 from "./Question4";
import Question5 from "./Question5";
import Question6 from "./Question6";
import Question7 from "./Question7";
import Question8 from "./Question8";
import Question9 from "./Question9";

const Questionnaire = ({ onRestart }) => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    distance: null,
    weight: null,
    height: null,
    type_trajet: [],
    relief: [],
    price: null,
    meteo: null,
    usage: null,
    mobilite: null,
  });

  const navigate = useNavigate(); // Utiliser le hook pour la navigation

  const handleNext = (newData) => {
    const newAnswers = { ...answers, ...newData };
    setAnswers(newAnswers);

    if (step === 9) {
      // Après la dernière question, naviguer vers les résultats
      navigate("/results", { state: { answers: newAnswers } });
    } else {
      // Passer à l'étape suivante
      setStep(step + 1);
    }
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center">
      {step === 1 && <Question1 onNext={handleNext} />}
      {step === 2 && <Question2 onNext={handleNext} />}
      {step === 3 && <Question3 onNext={handleNext} />}
      {step === 4 && <Question4 onNext={handleNext} />}
      {step === 5 && <Question5 onNext={handleNext} />}
      {step === 6 && <Question6 onNext={handleNext} />}
      {step === 7 && <Question7 onNext={handleNext} />}
      {step === 8 && <Question8 onNext={handleNext} />}
      {step === 9 && <Question9 onNext={handleNext} />}
    </div>
  );
};

export default Questionnaire;
