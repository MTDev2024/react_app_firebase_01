import { useState } from "react";

/**
 * Composant Question — remplace les 9 anciens composants Question1 à Question9.
 *
 * Reçoit les données d'une question depuis questionsData.js et affiche
 * le bon layout selon le type ("slider" ou "choice").
 *
 * Props :
 *   data       — objet question depuis questionsData.js
 *   onNext     — fonction appelée avec la réponse quand l'utilisateur valide
 *   onPrevious — fonction appelée quand l'utilisateur clique sur Précédent
 *   isLast     — true pour la dernière question (affiche "Valider" au lieu de "Suivant")
 */
const Question = ({ data, onNext, onPrevious, isLast, direction = "forward" }) => {
  const animationClass =
    direction === "forward" ? "animate-slide-in-right" : "animate-slide-in-left";
  // Pour les sliders : valeur numérique
  const [sliderValue, setSliderValue] = useState(data.defaultValue ?? 0);

  // Pour les choix : tableau si multiple, valeur simple sinon
  const [selected, setSelected] = useState(data.multiple ? [] : null);

  const [error, setError] = useState("");

  // Gestion de la sélection pour les questions à choix
  const toggleOption = (value) => {
    setError("");
    if (data.multiple) {
      // Ajoute ou retire la valeur du tableau
      setSelected((prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value],
      );
    } else {
      // Remplace la sélection courante
      setSelected(value);
    }
  };

  const isOptionSelected = (value) =>
    data.multiple ? selected.includes(value) : selected === value;

  // Validation et passage à la question suivante
  const handleSubmit = () => {
    if (data.type === "slider") {
      onNext({ [data.answerKey]: sliderValue });
    } else {
      const isEmpty = data.multiple ? selected.length === 0 : !selected;
      if (isEmpty) {
        setError("Veuillez sélectionner au moins une option.");
        return;
      }
      onNext({ [data.answerKey]: selected });
    }
  };

  // Boutons de navigation communs aux deux layouts
  const NavigationButtons = () => (
    <div className="flex space-x-4 mt-4">
      <button
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
        onClick={onPrevious}
      >
        Précédent
      </button>
      <button
        className="bg-blue-800 text-white font-mono px-6 py-2 shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out"
        onClick={handleSubmit}
      >
        {isLast ? "Valider" : "Suivant"}
      </button>
    </div>
  );

  // ─── Layout Slider ───────────────────────────────────────────────────────────
  if (data.type === "slider") {
    return (
      <section className={`flex flex-1 items-center justify-center w-full py-8 ${animationClass}`}>
        <div className="flex flex-col md:flex-row items-center max-w-3xl w-full px-6 md:px-12 space-y-8 md:space-y-0 md:space-x-8">
          {/* Image */}
          <div className="w-full md:w-1/2 h-64 md:h-80">
            <img
              src={data.image}
              alt={data.imageAlt}
              className="h-full w-full object-cover shadow-lg rounded"
            />
          </div>

          {/* Curseur */}
          <div className="flex flex-col items-center md:items-start w-full md:w-1/2 text-center md:text-left space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-800">
              {data.question}
            </h2>

            <input
              type="range"
              min={data.min}
              max={data.max}
              value={sliderValue}
              onChange={(e) => setSliderValue(Number(e.target.value))}
              className="w-full mt-4 appearance-none bg-gray-300 rounded-full h-2 focus:outline-none focus:ring focus:ring-blue-300"
              aria-label={data.question}
            />

            <div className="flex justify-between w-full mt-2 text-sm text-gray-600">
              <span>{data.minLabel}</span>
              <span>{data.maxLabel}</span>
            </div>

            <span className="text-blue-600 text-xl font-bold mt-2 py-1 border border-blue-500 rounded text-center w-28">
              {sliderValue} {data.unit}
            </span>

            {/* Messages contextuels optionnels (ex: avertissement à 0 ou 150 km) */}
            {data.messages?.map(({ when, text }) =>
              sliderValue === when ? (
                <p key={when} className="text-red-600 text-sm">
                  {text}
                </p>
              ) : null,
            )}

            <NavigationButtons />
          </div>
        </div>
      </section>
    );
  }

  // ─── Layout Choix (unique ou multiple) ───────────────────────────────────────
  return (
    <section className={`flex flex-1 items-center justify-center w-full py-8 ${animationClass}`}>
      <div className="flex flex-col items-center max-w-3xl w-full px-6 md:px-12 space-y-8">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-800 text-center">
          {data.question}
        </h2>

        <div
          className={`grid grid-cols-1 md:grid-cols-${data.columns} gap-4 w-full`}
        >
          {data.options.map((option) => (
            <button
              key={option.value}
              className={`group relative block overflow-hidden shadow-lg ${
                isOptionSelected(option.value) ? "border-2 border-blue-800" : ""
              }`}
              onClick={() => toggleOption(option.value)}
              aria-pressed={isOptionSelected(option.value)}
            >
              <img
                src={option.image}
                alt={option.alt}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gray-900 bg-opacity-10 flex items-center justify-center">
                <h3 className="text-white text-2xl font-semibold">
                  {option.label}
                </h3>
              </div>
            </button>
          ))}
        </div>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        <NavigationButtons />
      </div>
    </section>
  );
};

export default Question;
