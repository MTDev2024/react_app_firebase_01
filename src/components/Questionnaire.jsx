import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

  // Passer à la question suivante
  const handleNext = (newData) => {
    const newAnswers = { ...answers, ...newData };
    setAnswers(newAnswers);

    if (step === 9) {
      navigate("/results", { state: { answers: newAnswers } });
    } else {
      setStep(step + 1);
    }
  };

  // Revenir à la question précédente
  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Recommencer le questionnaire
  const handleRestart = () => {
    setAnswers({
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
    setStep(1);
  };

  // Suivi de progression
  const progressPercentage = (step / 9) * 100;

  return (
    <div className="flex-grow flex flex-col items-center justify-center">
      {/* Suivi de progression */}
      <div className="w-full max-w-2xl px-4">
        <div className="text-center text-gray-700 mb-2">
          <p>{`Question ${step} sur 9`}</p>
        </div>
        <div className="w-full bg-gray-300 h-2 rounded">
          <div
            className="bg-blue-600 h-2 rounded"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Questions */}
      <div className="flex-grow flex flex-col items-center justify-center w-full max-w-3xl">
        {step === 1 && <Question1 onNext={handleNext} onPrevious={handlePrevious} />}
        {step === 2 && <Question2 onNext={handleNext} onPrevious={handlePrevious} />}
        {step === 3 && <Question3 onNext={handleNext} onPrevious={handlePrevious} />}
        {step === 4 && <Question4 onNext={handleNext} onPrevious={handlePrevious} />}
        {step === 5 && <Question5 onNext={handleNext} onPrevious={handlePrevious} />}
        {step === 6 && <Question6 onNext={handleNext} onPrevious={handlePrevious} />}
        {step === 7 && <Question7 onNext={handleNext} onPrevious={handlePrevious} />}
        {step === 8 && <Question8 onNext={handleNext} onPrevious={handlePrevious} />}
        {step === 9 && <Question9 onNext={handleNext} onPrevious={handlePrevious} />}
      </div>

      {/* Bouton Recommencer */}
      <div className="flex space-x-4 mt-6 mb-6">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
          onClick={handleRestart}
        >
          Recommencer
        </button>
      </div>
    </div>
  );
};

export default Questionnaire;
