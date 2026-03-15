import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Question from "./Question";
import { questions } from "../data/questionsData";

const Questionnaire = () => {
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

      {/* Question courante — le composant unique lit ses données depuis questionsData.js */}
      <div className="flex-grow flex flex-col items-center justify-center w-full max-w-3xl">
        {/* key={step} force React à remonter le composant à chaque question,
            ce qui réinitialise les états (selected, sliderValue, error) */}
        <Question
          key={step}
          data={questions[step - 1]}
          onNext={handleNext}
          onPrevious={handlePrevious}
          isLast={step === questions.length}
        />
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
