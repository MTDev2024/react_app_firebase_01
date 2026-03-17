import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Question from "./Question";
import { questions } from "../data/questionsData";

const Questionnaire = () => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState("forward");
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
      setDirection("forward");
      setStep(step + 1);
    }
  };

  // Revenir à la question précédente
  const handlePrevious = () => {
    if (step > 1) {
      setDirection("backward");
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
    <div className="flex-grow flex flex-col items-center justify-center py-6">
      {/* Suivi de progression + Recommencer */}
      <div className="w-full max-w-2xl px-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <p className="text-gray-700 text-sm font-medium">{`Question ${step} sur 9`}</p>
          <button
            className="flex items-center gap-1 text-sm text-gray-400 hover:text-red-500 transition-colors duration-200 border border-gray-200 hover:border-red-300 rounded-full px-3 py-1"
            onClick={handleRestart}
          >
            ↺ Recommencer
          </button>
        </div>
        <div className="w-full bg-gray-300 h-2 rounded">
          <div
            className="bg-blue-600 h-2 rounded"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Question courante */}
      <div className="flex flex-col items-center w-full max-w-3xl">
        <Question
          key={step}
          data={questions[step - 1]}
          onNext={handleNext}
          onPrevious={handlePrevious}
          isLast={step === questions.length}
          direction={direction}
        />
      </div>
    </div>
  );
};

export default Questionnaire;
