import React, { useState } from "react";

const ResultsFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    price: 5000,
    puissance: 500,
    autonomie: 50,
    poids: 30,
    search: "",
  });

  // Mise à jour des filtres locaux et appel de la fonction parent
  const handleChange = (key, value) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters); // Envoie les filtres mis à jour au parent
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md mb-6">
      <h3 className="text-xl font-bold text-blue-800 mb-4">Filtrer les résultats</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Recherche par texte */}
        <div>
          <label htmlFor="search" className="block text-gray-700 font-medium mb-2">
            Recherche (marque/modèle)
          </label>
          <input
            type="text"
            id="search"
            value={filters.search}
            onChange={(e) => handleChange("search", e.target.value)}
            placeholder="Ex : Xiaomi"
            className="w-full border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Filtrage par prix */}
        <div>
          <label htmlFor="price" className="block text-gray-700 font-medium mb-2">
            Prix max (€)
          </label>
          <input
            type="range"
            id="price"
            min="0"
            max="9999"
            step="100"
            value={filters.price}
            onChange={(e) => handleChange("price", parseInt(e.target.value))}
            className="w-full"
          />
          <p className="text-blue-600 font-bold mt-2">{filters.price} €</p>
        </div>

        {/* Filtrage par puissance */}
        <div>
          <label htmlFor="puissance" className="block text-gray-700 font-medium mb-2">
            Puissance min (W)
          </label>
          <input
            type="range"
            id="puissance"
            min="0"
            max="2000"
            step="50"
            value={filters.puissance}
            onChange={(e) => handleChange("puissance", parseInt(e.target.value))}
            className="w-full"
          />
          <p className="text-blue-600 font-bold mt-2">{filters.puissance} W</p>
        </div>

        {/* Filtrage par autonomie */}
        <div>
          <label htmlFor="autonomie" className="block text-gray-700 font-medium mb-2">
            Autonomie min (km)
          </label>
          <input
            type="range"
            id="autonomie"
            min="0"
            max="150"
            step="5"
            value={filters.autonomie}
            onChange={(e) => handleChange("autonomie", parseInt(e.target.value))}
            className="w-full"
          />
          <p className="text-blue-600 font-bold mt-2">{filters.autonomie} km</p>
        </div>

        {/* Filtrage par poids */}
        <div>
          <label htmlFor="poids" className="block text-gray-700 font-medium mb-2">
            Poids max (kg)
          </label>
          <input
            type="range"
            id="poids"
            min="0"
            max="50"
            step="1"
            value={filters.poids}
            onChange={(e) => handleChange("poids", parseInt(e.target.value))}
            className="w-full"
          />
          <p className="text-blue-600 font-bold mt-2">{filters.poids} kg</p>
        </div>
      </div>
    </div>
  );
};

export default ResultsFilter;
