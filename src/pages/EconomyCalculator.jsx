import React, { useState } from "react";

const EconomyCalculator = () => {
  const [formData, setFormData] = useState({
    dailyDistance: "",
    fuelConsumption: "",
    fuelPrice: "",
    vehicleAge: "",
    wearCostPerKm: ""
  });

  const [results, setResults] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData, [name]: value };

      // Calculate wearCostPerKm dynamically based on vehicleAge
      if (name === "vehicleAge") {
        const age = parseInt(value, 10);
        let maintenanceCostPerKm = 0.05;
        if (age > 5) maintenanceCostPerKm = age <= 10 ? 0.08 : 0.12;
        updatedFormData.wearCostPerKm = maintenanceCostPerKm;
      }

      return updatedFormData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { dailyDistance, fuelConsumption, fuelPrice, wearCostPerKm, vehicleAge } = formData;

    if (!dailyDistance || !fuelConsumption || !fuelPrice || !vehicleAge) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    const dailyDistanceNum = parseFloat(dailyDistance);
    const fuelConsumptionNum = parseFloat(fuelConsumption);
    const fuelPriceNum = parseFloat(fuelPrice);
    const wearCostNum = parseFloat(wearCostPerKm);

    const monthlyDistance = dailyDistanceNum * 30;

    // Calcul des coûts de la voiture
    const fuelCost =
      (fuelConsumptionNum / 100) * dailyDistanceNum * 30 * fuelPriceNum;

    const maintenanceCost = monthlyDistance * wearCostNum;
    const totalCarCost = fuelCost + maintenanceCost;

    // Calcul des coûts de la trottinette
    const electricityPrice = 0.25; // Prix moyen de l'électricité en €/kWh
    const scooterConsumptionPerKm = 0.015; // Consommation moyenne en kWh/km
    const scooterMaintenancePerKm = 0.0375; // Usure, pneus, chambre à air, etc.
    const laborCostPerKm = 0.03; // Main-d'œuvre pour les réparations

    const scooterCostPerKm =
      scooterConsumptionPerKm * electricityPrice +
      scooterMaintenancePerKm +
      laborCostPerKm;

    const scooterCost = monthlyDistance * scooterCostPerKm;

    // Calcul des émissions carbone
    const fuelEmissionFactor = 2.3; // kg CO₂/L pour l'essence
    const scooterElectricEmissionFactor = 0.056; // kg CO₂/kWh en France
    const carCO2 = (fuelConsumptionNum / 100) * monthlyDistance * fuelEmissionFactor;
    const scooterCO2 = monthlyDistance * scooterConsumptionPerKm * scooterElectricEmissionFactor;

    const savings = totalCarCost - scooterCost;

    setResults({
      totalCarCost: totalCarCost.toFixed(2),
      scooterCost: scooterCost.toFixed(2),
      carCO2: carCO2.toFixed(2),
      scooterCO2: scooterCO2.toFixed(2),
      savings: savings.toFixed(2),
    });
  };

  return (
    <main className="flex-grow mt-4">
      {/* Hero Section */}
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
          <p className="text-base md:text-xl leading-relaxed">
            Lorsque les embouteillages, les coûts de carburant et l'entretien de
            votre voiture rendent vos trajets quotidiens inefficaces, une
            trottinette électrique devient une alternative pratique. Sans
            remplacer la voiture, elle s'intègre parfaitement comme un
            complément dans votre quotidien.
          </p>
        </div>
      </section>

      {/* Texte SEO */}
      <section className="py-8 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto space-y-4">
          <h2 className="text-xl text-center font-bold mb-4">
            Quels avantages à réduire nos déplacements en voiture pour favoriser
            les mobilités douces ?
          </h2>
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

      {/* Calculator Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <div className="bg-white shadow-lg p-6 rounded-lg animate-slide-up">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Calculez vos économies</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    Distance parcourue par jour (km)
                  </label>
                  <input
                    type="number"
                    name="dailyDistance"
                    value={formData.dailyDistance}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="Ex : 15"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    Consommation de carburant (L/100 km)
                  </label>
                  <input
                    type="number"
                    name="fuelConsumption"
                    value={formData.fuelConsumption}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="Ex : 7"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    Prix moyen du carburant (€/L)
                  </label>
                  <input
                    type="number"
                    name="fuelPrice"
                    value={formData.fuelPrice}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="Ex : 1.8"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    Âge du véhicule (années)
                  </label>
                  <input
                    type="number"
                    name="vehicleAge"
                    value={formData.vehicleAge}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="Ex : 5"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    Coût d'usure par km (€) <span className="text-gray-500">(calculé automatiquement)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.wearCostPerKm}
                    className="w-full p-2 border rounded bg-gray-100 text-gray-500"
                    readOnly
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
                >
                  Calculer
                </button>
              </form>
            </div>

            {/* Results */}
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
                    <li>Pour la voiture : le carburant, les coûts d'entretien (varient selon l'âge du véhicule) et les émissions de CO₂ liées à la combustion du carburant.</li>
                    <li>Pour la trottinette : la consommation électrique, l'usure (pneus et chambres à air), la main-d'œuvre éventuelle pour les réparations, et les émissions de CO₂ liées à la consommation électrique.</li>
                  </ul>
                  <span className="block mt-2">
                    Ces calculs n'incluent pas le prix d'achat de votre voiture ou trottinette. Ils sont indicatifs et peuvent varier en fonction de votre situation personnelle et des tarifs locaux.
                  </span>
                </p>
                <button
                  onClick={() => setResults(null)}
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
