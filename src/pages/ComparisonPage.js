import React from 'react';
import { useLocation } from 'react-router-dom';

export default function ComparisonPage() {
  const location = useLocation();
  const { selectedScooters } = location.state || { selectedScooters: [] };

  if (selectedScooters.length === 0) {
    return <p className="text-center text-red-600 font-bold">Aucune trottinette sélectionnée pour la comparaison.</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-bold mb-6 text-center">Comparaison des Trottinettes</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {selectedScooters.map((scooter) => (
          <div key={scooter.itemID} className="border p-6 rounded-lg shadow-md bg-gray-800 text-white">
            <div className="flex flex-col items-center">
              {/* Image de la trottinette */}
              <img
                src={scooter.image}
                alt={`${scooter.marque} - ${scooter.modele}`}
                className="w-full h-64 object-contain mb-4"
              />
              {/* Informations de la trottinette */}
              <h3 className="text-2xl font-bold mb-2">{scooter.marque} - {scooter.modele}</h3>
              <div className="text-left w-full">
                <p><strong>Autonomie :</strong> {scooter.distance_max} km</p>
                <p><strong>Poids max utilisateur :</strong> {scooter.poids_max} kg</p>
                <p><strong>Poids trottinette :</strong> {scooter.poids_trottinette} kg</p>
                <p><strong>Guidon :</strong> {scooter.taille_guidon}</p>
                <p><strong>Type de trajet :</strong> {scooter.type_trajet.join(', ')}</p>
                <p><strong>Relief :</strong> {scooter.relief.join(', ')}</p>
                <p className="text-2xl font-bold mt-4">{scooter.prix} €</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
