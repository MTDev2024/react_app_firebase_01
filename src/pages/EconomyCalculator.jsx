import React, { useState } from "react";

const EconomyCalculator = () => {
  // État pour stocker les données du formulaire
  const [formData, setFormData] = useState({
    dailyDistance: "",        // Distance parcourue par jour en km
    fuelConsumption: "",      // Consommation de carburant en L/100 km
    fuelPrice: "",            // Prix moyen du carburant en €/L
    vehicleAge: "",           // Âge du véhicule en années
    wearCostPerKm: ""         // Coût d'usure par km, calculé automatiquement selon l'âge
  });

  // État pour stocker les résultats du calcul
  const [results, setResults] = useState(null);

  // État pour stocker les messages d'erreur pour chaque champ
  const [errors, setErrors] = useState({});

  // Fonction qui calcule le coût d'usure par km en fonction de l'âge du véhicule
  const calculateWearCostPerKm = (age) => {
    let maintenanceCostPerKm = 0.05; // Coût par défaut : 0,05 € par km
    if (age > 5) {
      maintenanceCostPerKm = age <= 10 ? 0.08 : 0.12;
    }
    return maintenanceCostPerKm;
  };

  // Fonction de gestion du changement dans les champs du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Mettre à jour les données du formulaire
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData, [name]: value };

      // Si l'utilisateur modifie l'âge du véhicule, recalculer le coût d'usure
      if (name === "vehicleAge") {
        const age = parseInt(value, 10);
        if (!isNaN(age)) {
          updatedFormData.wearCostPerKm = calculateWearCostPerKm(age);
        } else {
          updatedFormData.wearCostPerKm = "";
        }
      }
      return updatedFormData;
    });

    // Réinitialiser l'erreur associée à ce champ
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  // Fonction de validation du formulaire
  const validateForm = () => {
    const newErrors = {};
    if (!formData.dailyDistance || parseFloat(formData.dailyDistance) <= 0) {
      newErrors.dailyDistance = "La distance doit être supérieure à 0.";
    }
    if (!formData.fuelConsumption || parseFloat(formData.fuelConsumption) <= 0) {
      newErrors.fuelConsumption = "La consommation doit être supérieure à 0.";
    }
    if (!formData.fuelPrice || parseFloat(formData.fuelPrice) <= 0) {
      newErrors.fuelPrice = "Le prix du carburant doit être supérieur à 0.";
    }
    if (!formData.vehicleAge || parseFloat(formData.vehicleAge) <= 0) {
      newErrors.vehicleAge = "L'âge du véhicule doit être supérieur à 0.";
    }
    return newErrors;
  };

  // Fonction de gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    // Valider les données du formulaire
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return; // Arrêter le traitement si des erreurs sont détectées
    }

    // Extraction et conversion des valeurs du formulaire
    const { dailyDistance, fuelConsumption, fuelPrice, wearCostPerKm } = formData;
    const dailyDistanceNum = parseFloat(dailyDistance);
    const fuelConsumptionNum = parseFloat(fuelConsumption);
    const fuelPriceNum = parseFloat(fuelPrice);
    const wearCostNum = parseFloat(wearCostPerKm);

    // Calcul de la distance mensuelle (supposant 30 jours par mois)
    const monthlyDistance = dailyDistanceNum * 30;

    // --- Calculs pour la voiture ---
    // Coût du carburant = (consommation (L/100 km) / 100) * distance quotidienne * 30 jours * prix du carburant
    const fuelCost =
      (fuelConsumptionNum / 100) * dailyDistanceNum * 30 * fuelPriceNum;
    // Coût d'entretien = distance mensuelle * coût d'usure par km
    const maintenanceCost = monthlyDistance * wearCostNum;
    // Coût total de la voiture
    const totalCarCost = fuelCost + maintenanceCost;

    // --- Calculs pour la trottinette ---
    // Explication sur la consommation de la trottinette :
    // - Prix moyen de l'électricité : 0,25 €/kWh
    // - Consommation électrique : 0,015 kWh par km
    // - Coût de maintenance : 0,0375 €/km (usure, pneus, chambres à air, etc.)
    // - Coût de main-d'œuvre pour réparations : 0,03 €/km
    // Le coût par km est calculé en additionnant :
    // (consommation * prix de l'électricité) + coût de maintenance + coût de main-d'œuvre
    const electricityPrice = 0.25;
    const scooterConsumptionPerKm = 0.015;
    const scooterMaintenancePerKm = 0.0375;
    const laborCostPerKm = 0.03;
    const scooterCostPerKm =
      scooterConsumptionPerKm * electricityPrice +
      scooterMaintenancePerKm +
      laborCostPerKm;
    // Coût mensuel de la trottinette
    const scooterCost = monthlyDistance * scooterCostPerKm;

    // --- Calcul des émissions de CO₂ ---
    // Pour la voiture : émissions basées sur le carburant (2,3 kg CO₂ par litre)
    const fuelEmissionFactor = 2.3;
    const carCO2 = (fuelConsumptionNum / 100) * monthlyDistance * fuelEmissionFactor;
    // Pour la trottinette : émissions basées sur la consommation électrique (0,056 kg CO₂/kWh)
    const scooterElectricEmissionFactor = 0.056;
    const scooterCO2 = monthlyDistance * scooterConsumptionPerKm * scooterElectricEmissionFactor;

    // Calcul des économies mensuelles
    const savings = totalCarCost - scooterCost;

    // Mise à jour de l'état des résultats (arrondis à deux décimales)
    setResults({
      totalCarCost: totalCarCost.toFixed(2),
      scooterCost: scooterCost.toFixed(2),
      carCO2: carCO2.toFixed(2),
      scooterCO2: scooterCO2.toFixed(2),
      savings: savings.toFixed(2),
    });
  };

  // Fonction pour réinitialiser le formulaire, les résultats et les erreurs
  const handleReset = () => {
    setFormData({
      dailyDistance: "",
      fuelConsumption: "",
      fuelPrice: "",
      vehicleAge: "",
      wearCostPerKm: ""
    });
    setResults(null);
    setErrors({});
  };

  return (
    <main className="flex-grow mt-4">
      {/* Section Hero avec image de fond et texte accrocheur */}
      <section
        className="flex flex-col justify-center max-w-7xl mx-auto py-16 px-4 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://www.neozone.org/blog/wp-content/uploads/2020/11/trottinette-mercedes-003-780x502.jpg')",
        }}
      >
        <div className="w-full bg-black/30 text-white space-y-4 text-center p-8 mx-auto rounded-md">
          <h1 className="text-4xl font-bold mb-4">
            Réduisez vos coûts tout en adoptant une mobilité plus flexible
          </h1>
          <h2 className="text-2xl font-semibold mb-2">
            Les trottinettes électriques : une solution adaptée aux conditions défavorables
          </h2>
        </div>
      </section>

      {/* Section SEO pour le référencement */}
      <section className="py-8 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto space-y-4">
          <h2 className="text-xl text-center font-bold mb-4">
            Quels avantages à réduire nos déplacements en voiture pour favoriser
            les mobilités douces ?
          </h2>
          <p className="text-gray-600">
            Lorsque les embouteillages, les coûts de carburant et l'entretien de
            votre voiture rendent vos trajets quotidiens inefficaces, une
            trottinette électrique devient une alternative pratique. Sans
            remplacer la voiture, elle s'intègre parfaitement comme un
            complément dans votre quotidien.
          </p>
          <p className="text-gray-600">
            Le temps passé dans les embouteillages dans les grandes villes est
            une réalité bien trop courante. Ce temps perdu, ajouté aux coûts
            liés au carburant et à l'entretien de la voiture, en fait une
            solution peu efficace pour les trajets quotidiens.
          </p>
          <p className="text-gray-600">
            La trottinette électrique est une alternative pratique et économique
            pour les trajets courts. Elle permet non seulement de gagner du
            temps en évitant les bouchons, mais aussi de réduire les coûts
            mensuels, surtout pour les trajets quotidiens en ville.
          </p>
          <p className="text-gray-600">
            De plus, en évitant l'usage de la voiture pour les trajets en solo,
            vous contribuez à réduire l'empreinte carbone et à alléger les rues.
            Un geste simple mais efficace pour votre porte-monnaie et pour
            l'environnement !
          </p>
        </div>
      </section>

      {/* Section du calculateur */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Formulaire de saisie avec fieldset pour améliorer l'accessibilité */}
            <div className="bg-white shadow-lg p-6 rounded-lg animate-slide-up">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Calculez vos économies</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <fieldset>
                  <legend className="sr-only">Informations sur votre véhicule et vos trajets</legend>
                  {/* Champ : Distance parcourue par jour */}
                  <div>
                    <label className="block mb-1 font-medium text-gray-700" htmlFor="dailyDistance">
                      Distance parcourue par jour (km)
                    </label>
                    <input
                      type="number"
                      id="dailyDistance"
                      name="dailyDistance"
                      value={formData.dailyDistance}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                      placeholder="Ex : 15"
                      aria-label="Distance parcourue par jour en kilomètres"
                      required
                    />
                    {errors.dailyDistance && (
                      <span className="text-red-600 text-sm">{errors.dailyDistance}</span>
                    )}
                  </div>
                  {/* Champ : Consommation de carburant */}
                  <div>
                    <label className="block mb-1 font-medium text-gray-700" htmlFor="fuelConsumption">
                      Consommation de carburant (L/100 km)
                    </label>
                    <input
                      type="number"
                      id="fuelConsumption"
                      name="fuelConsumption"
                      value={formData.fuelConsumption}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                      placeholder="Ex : 7"
                      aria-label="Consommation de carburant en litres par 100 kilomètres"
                      required
                    />
                    {errors.fuelConsumption && (
                      <span className="text-red-600 text-sm">{errors.fuelConsumption}</span>
                    )}
                  </div>
                  {/* Champ : Prix moyen du carburant */}
                  <div>
                    <label className="block mb-1 font-medium text-gray-700" htmlFor="fuelPrice">
                      Prix moyen du carburant (€/L)
                    </label>
                    <input
                      type="number"
                      id="fuelPrice"
                      name="fuelPrice"
                      value={formData.fuelPrice}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                      placeholder="Ex : 1.8"
                      aria-label="Prix moyen du carburant en euros par litre"
                      required
                    />
                    {errors.fuelPrice && (
                      <span className="text-red-600 text-sm">{errors.fuelPrice}</span>
                    )}
                  </div>
                  {/* Champ : Âge du véhicule */}
                  <div>
                    <label className="block mb-1 font-medium text-gray-700" htmlFor="vehicleAge">
                      Âge du véhicule (années)
                    </label>
                    <input
                      type="number"
                      id="vehicleAge"
                      name="vehicleAge"
                      value={formData.vehicleAge}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                      placeholder="Ex : 5"
                      aria-label="Âge du véhicule en années"
                      required
                    />
                    {errors.vehicleAge && (
                      <span className="text-red-600 text-sm">{errors.vehicleAge}</span>
                    )}
                  </div>
                  {/* Champ : Coût d'usure par km (calculé automatiquement) */}
                  <div>
                    <label className="block mb-1 font-medium text-gray-700">
                      Coût d'usure par km (€) <span className="text-gray-500">(calculé automatiquement)</span>
                    </label>
                    <input
                      type="text"
                      name="wearCostPerKm"
                      value={formData.wearCostPerKm}
                      className="w-full p-2 border rounded bg-gray-100 text-gray-500"
                      readOnly
                      aria-label="Coût d'usure par kilomètre"
                    />
                  </div>
                </fieldset>
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
                >
                  Calculer
                </button>
              </form>
            </div>

            {/* Affichage des résultats */}
            {results && (
              <div className="bg-white shadow-lg p-6 rounded-lg animate-slide-up">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Vos résultats</h2>
                <p>
                  <strong>Coût mensuel avec votre voiture :</strong> {results.totalCarCost} €
                </p>
                <p>
                  <strong>Coût mensuel avec une trottinette :</strong> {results.scooterCost} €
                </p>
                <p>
                  <strong>Émissions de CO₂ pour la voiture :</strong> {results.carCO2} kg
                </p>
                <p>
                  <strong>Émissions de CO₂ pour la trottinette :</strong> {results.scooterCO2} kg
                </p>
                <p className="text-green-600 font-bold">
                  <strong>Économies réalisées :</strong> {results.savings} € par mois
                </p>
                <p className="text-sm text-gray-500 mt-4">
                  Les coûts et émissions indiqués sont basés sur des moyennes estimées et incluent :
                  <ul className="list-disc ml-6">
                    <li>Pour la voiture : carburant, entretien (varie selon l'âge du véhicule) et émissions de CO₂ liées à la combustion.</li>
                    <li>Pour la trottinette : consommation électrique, usure (pneus, chambres à air), main-d'œuvre pour réparations et émissions de CO₂ liées à la consommation électrique.</li>
                  </ul>
                  <span className="block mt-2">
                    Ces calculs n'incluent pas le prix d'achat de votre véhicule ou trottinette. Ils sont indicatifs et peuvent varier selon votre situation et les tarifs locaux.
                  </span>
                </p>
                <button
                  onClick={handleReset}
                  className="mt-4 w-full py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition duration-300"
                >
                  Recalculer
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default EconomyCalculator;
