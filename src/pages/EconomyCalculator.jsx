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
    <div className="flex flex-col justify-center  max-w-7xl mx-auto">
      {/* Texte SEO */}
      <div className="shadow-md text-center">
        <h2 className="text-xl font-bold mb-4">Pourquoi passer à la trottinette électrique ?</h2>
        <p className="mb-4">
          Le temps passé dans les embouteillages dans les grandes villes est une réalité bien trop courante. Ce temps perdu, ajouté aux coûts liés au carburant et à l'entretien de la voiture, en fait une solution peu efficace pour les trajets quotidiens.
        </p>
        <p className="mb-4">
          La trottinette électrique est une alternative pratique et économique pour les trajets courts. Elle permet non seulement de gagner du temps en évitant les bouchons, mais aussi de réduire les coûts mensuels, surtout pour les trajets quotidiens en ville.
        </p>
        <p className="mb-4">
          De plus, en évitant l'usage de la voiture pour les trajets en solo, vous contribuez à réduire l'empreinte carbone et à alléger les rues. Un geste simple mais efficace pour votre porte-monnaie et pour l'environnement !
        </p>
      </div>
  
      
      {/* Section calculateur et image */}
      <section className="flex justify-center shadow-md max-w-6xl w-full">
        {/* Calculateur */}
        <div className="flex flex-col justify-center">
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Distance parcourue par jour (en km) :</label>
              <input
                type="number"
                name="dailyDistance"
                value={formData.dailyDistance}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md"
                placeholder="Ex : 15"
                required
              />
            </div>
  
            <div>
              <label className="block mb-1 font-medium">Consommation de votre voiture (L/100 km) :</label>
              <input
                type="number"
                name="fuelConsumption"
                value={formData.fuelConsumption}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md"
                placeholder="Ex : 7"
                required
              />
            </div>
  
            <div>
              <label className="block mb-1 font-medium">Prix moyen du carburant (€/L) :</label>
              <input
                type="number"
                name="fuelPrice"
                value={formData.fuelPrice}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md"
                placeholder="Ex : 1.8"
                required
              />
            </div>
  
            <div>
              <label className="block mb-1 font-medium">Coût moyen d'usure par km (en €) :</label>
              <input
                type="number"
                name="wearCostPerKm"
                value={formData.wearCostPerKm}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md"
                placeholder="Ex : 0.10"
                required
              />
            </div>
  
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Calculer
            </button>
          </form>
         
        </div>
  
        {/* Image illustrative */}
        <div className="w-full lg:w-1/2 p-8 flex justify-center items-center">
          <img
            src="https://www.neozone.org/blog/wp-content/uploads/2020/11/trottinette-mercedes-003-780x502.jpg"
            alt="Trottinette électrique vs voiture"
            className="max-w-full h-auto shadow-md"
          />
        </div>

      </section>




        {/* Résultats */}
        {results && (
            <section className="flex flex-col items-center">
              <h3 className="text-lg font-bold">Résultats :</h3>
              <p>
                <strong>Coût mensuel avec votre voiture :</strong> {results.totalCarCost} €
              </p>
              <p>
                <strong>Coût mensuel avec une trottinette :</strong> {results.scooterCost} €
              </p>
              <p>
                <strong>Économies réalisées :</strong> {results.savings} € par mois
              </p>
            </section>
          )}
    </div>
  );
  

  
  
};

export default EconomyCalculator;
