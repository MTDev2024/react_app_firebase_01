import React, { useState } from "react";
import trottinettes from "../data/trottinettes";
import Card from "./Card";
import ResultsFilter from "./ResultsFilter";

const Results = ({ answers, onRestart }) => {
  const [filters, setFilters] = useState({
    price: 5000,
    puissance: 100,
    poids: 50,
    autonomie: 10,
    search: "",
    sortBy: "",
    sortOrder: "asc",
  });

  // Mettre à jour les filtres
  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  // Filtrer les résultats en fonction des réponses et des filtres
  let filteredResults = trottinettes.filter((trottinette) => {
    const priceMatch = trottinette.prix <= filters.price;
    const puissanceMatch = trottinette.puissance >= filters.puissance;
    const poidsMatch = trottinette.poids <= filters.poids;
    const autonomieMatch = trottinette.distance_max >= filters.autonomie;
    const searchMatch =
      filters.search === "" ||
      trottinette.modele.toLowerCase().includes(filters.search.toLowerCase()) ||
      trottinette.marque.toLowerCase().includes(filters.search.toLowerCase());

    // Vérifier les autres critères existants (par exemple distance, etc.)
    const distanceMatch =
      answers.distance === null || trottinette.distance_max >= answers.distance;
    const weightMatch =
      answers.weight === null || trottinette.poids_max >= answers.weight;

    // Vérifier si toutes les conditions sont remplies
    return (
      priceMatch &&
      puissanceMatch &&
      poidsMatch &&
      autonomieMatch &&
      searchMatch &&
      distanceMatch &&
      weightMatch
    );
  });

  // Trier les résultats en fonction des filtres
  if (filters.sortBy) {
    filteredResults.sort((a, b) => {
      if (filters.sortOrder === "asc") {
        return a[filters.sortBy] - b[filters.sortBy];
      } else {
        return b[filters.sortBy] - a[filters.sortBy];
      }
    });
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold">Résultats</h2>
      {/* Intégrer le composant ResultsFilter */}
      <ResultsFilter onFilterChange={handleFilterChange} />
      <div className="flex justify-between items-center my-4">
        <input
          type="text"
          placeholder="Rechercher par marque ou modèle..."
          value={filters.search}
          onChange={(e) => handleFilterChange({ search: e.target.value })}
          className="p-2 border border-gray-300 rounded-lg"
        />
        <div className="flex items-center space-x-4">
          <label className="font-bold">Trier par :</label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange({ sortBy: e.target.value })}
            className="p-2 border border-gray-300 rounded-lg"
          >
            <option value="">Aucun</option>
            <option value="autonomie">Autonomie</option>
            <option value="prix">Prix</option>
            <option value="puissance">Puissance</option>
            <option value="poids">Poids</option>
          </select>
          <select
            value={filters.sortOrder}
            onChange={(e) => handleFilterChange({ sortOrder: e.target.value })}
            className="p-2 border border-gray-300 rounded-lg"
          >
            <option value="asc">Ascendant</option>
            <option value="desc">Descendant</option>
          </select>
        </div>
      </div>
      {filteredResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredResults.map((trottinette, index) => (
            <Card key={index} trottinette={trottinette} />
          ))}
        </div>
      ) : (
        <p className="text-red-600 font-bold">
          Aucun modèle ne correspond à vos critères. Veuillez essayer à nouveau
          avec des critères différents.
        </p>
      )}
      <button
        className="mt-4 bg-blue-600 text-white py-2 px-4"
        onClick={onRestart}
      >
        Recommencer
      </button>
    </div>
  );
};

export default Results;
