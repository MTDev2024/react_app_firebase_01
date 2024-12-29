import React, { useState } from "react";

const EconomyCalculator = () => {
  const [formData, setFormData] = useState({
    dailyDistance: "",
    fuelConsumption: "",
    fuelPrice: "",
    wearCostPerKm: "",
  });

  const [results, setResults] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { dailyDistance, fuelConsumption, fuelPrice, wearCostPerKm } = formData;

    if (!dailyDistance || !fuelConsumption || !fuelPrice || !wearCostPerKm) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    const dailyDistanceNum = parseFloat(dailyDistance);
    const fuelConsumptionNum = parseFloat(fuelConsumption);
    const fuelPriceNum = parseFloat(fuelPrice);
    const wearCostNum = parseFloat(wearCostPerKm);

    const monthlyDistance = dailyDistanceNum * 30;

    const fuelCost =
      (fuelConsumptionNum / 100) * dailyDistanceNum * 30 * fuelPriceNum;
    const wearCost = monthlyDistance * wearCostNum;
    const totalCarCost = fuelCost + wearCost;

    const scooterCostPerKm = 0.05;
    const scooterCost = monthlyDistance * scooterCostPerKm;
    const savings = totalCarCost - scooterCost;

    setResults({
      totalCarCost: totalCarCost.toFixed(2),
      scooterCost: scooterCost.toFixed(2),
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
            Lorsque les embouteillages, les coûts de carburant et l'entretien de votre voiture rendent vos trajets quotidiens inefficaces, une trottinette électrique devient une alternative pratique. Sans remplacer la voiture, elle s'intègre parfaitement comme un complément dans votre quotidien.
          </p>
        </div>
      </section>

      {/* Texte SEO */}
      <section className="py-8 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto space-y-4">
          <h2 className="text-xl text-center font-bold mb-4">
            Quels avantages à réduire nos déplacements en voiture pour favoriser les mobilités douces ?
          </h2>
          <p className="text-gray-600">
            Le temps passé dans les embouteillages dans les grandes villes est une réalité bien trop courante. Ce temps perdu, ajouté aux coûts liés au carburant et à l'entretien de la voiture, en fait une solution peu efficace pour les trajets quotidiens.
          </p>
          <p className="text-gray-600">
            La trottinette électrique est une alternative pratique et économique pour les trajets courts. Elle permet non seulement de gagner du temps en évitant les bouchons, mais aussi de réduire les coûts mensuels, surtout pour les trajets quotidiens en ville.
          </p>
          <p className="text-gray-600">
            De plus, en évitant l'usage de la voiture pour les trajets en solo, vous contribuez à réduire l'empreinte carbone et à alléger les rues. Un geste simple mais efficace pour votre porte-monnaie et pour l'environnement !
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
                    Coût d'usure par km (€)
                  </label>
                  <input
                    type="number"
                    name="wearCostPerKm"
                    value={formData.wearCostPerKm}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="Ex : 0.10"
                    required
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
                <p className="text-green-600 font-bold">
                  <strong>Économies réalisées :</strong> {results.savings} € par mois
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
