import React, { useState } from "react";
import Question1 from "./Question1";
import Question2 from "./Question2";
import Question3 from "./Question3";
import Question4 from "./Question4";
import Question5 from "./Question5";
import Question6 from "./Question6";
import Question7 from "./Question7";
import Question8 from "./Question8";
import Question9 from "./Question9";
import Results from "./Results";

const Questionnaire = () => {
  const [step, setStep] = useState(1); // Suivi de l'étape actuelle
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

  const handleNext = (newData) => {
    setAnswers({ ...answers, ...newData }); // Met à jour les réponses
    setStep(step + 1); // Passe à l'étape suivante
  };

  return (
    <div>
      {step === 1 && <Question1 onNext={handleNext} />}
      {step === 2 && <Question2 onNext={handleNext} />}
      {step === 3 && <Question3 onNext={handleNext} />}
      {step === 4 && <Question4 onNext={handleNext} />}
      {step === 5 && <Question5 onNext={handleNext} />}
      {step === 6 && <Question6 onNext={handleNext} />}
      {step === 7 && <Question7 onNext={handleNext} />}
      {step === 8 && <Question8 onNext={handleNext} />}
      {step === 9 && <Question9 onNext={handleNext} />}
      {step === 10 && <Results answers={answers} />}
    </div>
  );
};

export default Questionnaire;
