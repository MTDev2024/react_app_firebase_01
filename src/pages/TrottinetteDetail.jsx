import { useParams, useNavigate } from "react-router-dom";
import trottinettes from "../data/trottinettes";

const Spec = ({ label, value }) => (
  <div className="flex justify-between border-b border-gray-100 py-2">
    <span className="text-gray-500 font-medium">{label}</span>
    <span className="text-gray-800 font-semibold">
      {Array.isArray(value) ? value.join(", ") || "NC" : value || "NC"}
    </span>
  </div>
);

const TrottinetteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const trottinette = trottinettes.find((t) => t.itemID === id);

  if (!trottinette) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-gray-600 mb-4">Trottinette introuvable.</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Retour
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Bouton retour */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
      >
        ← Retour aux résultats
      </button>

      {/* En-tête */}
      <div className="bg-gray-800 text-white rounded-2xl p-6 mb-8 flex flex-col md:flex-row gap-6 items-center">
        <img
          src={trottinette.image || trottinette.urlImage}
          alt={trottinette.modele}
          className="w-full md:w-64 h-48 object-contain"
        />
        <div>
          <p className="text-yellow-400 italic text-sm mb-1">Sélection de la rédaction</p>
          <h1 className="text-3xl font-bold">{trottinette.marque}</h1>
          <h2 className="text-xl font-semibold text-gray-300 mb-4">{trottinette.modele}</h2>
          <p className="text-3xl font-bold text-blue-400">
            {trottinette.prix ? `${trottinette.prix} €` : "Prix NC"}
          </p>
        </div>
      </div>

      {/* Specs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Performances */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-bold text-blue-800 mb-4">Performances</h3>
          <Spec label="Autonomie" value={trottinette.distance_max ? `${trottinette.distance_max} km` : null} />
          <Spec label="Puissance moteur" value={trottinette.puissance_moteur ? `${trottinette.puissance_moteur} W` : null} />
          <Spec label="Pente max" value={trottinette.pente_max ? `${trottinette.pente_max} ${trottinette.pente_unite || "%"}` : null} />
        </div>

        {/* Poids & Dimensions */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-bold text-blue-800 mb-4">Poids & Dimensions</h3>
          <Spec label="Poids trottinette" value={trottinette.poids_trottinette ? `${trottinette.poids_trottinette} kg` : null} />
          <Spec label="Poids max utilisateur" value={trottinette.poids_max ? `${trottinette.poids_max} kg` : null} />
          <Spec label="Guidon" value={trottinette.guidon || trottinette.taille_guidon} />
        </div>

        {/* Freinage & Pneus */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-bold text-blue-800 mb-4">Freinage & Pneus</h3>
          <Spec label="Freins" value={trottinette.freins} />
          <Spec label="Type de pneus" value={trottinette.pneus_type} />
          <Spec label="Taille des pneus" value={trottinette.pneus_taille} />
          <Spec label="Suspensions" value={trottinette.amortisseurs} />
        </div>

        {/* Batterie */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-bold text-blue-800 mb-4">Batterie</h3>
          <Spec label="Voltage" value={trottinette.batterie_voltage ? `${trottinette.batterie_voltage} V` : null} />
          <Spec label="Ampérage" value={trottinette.batterie_amperage ? `${trottinette.batterie_amperage} Ah` : null} />
          <Spec label="Type" value={trottinette.batterie_type} />
          <Spec label="Étanchéité" value={trottinette.etancheite} />
        </div>

        {/* Connectivité & Options */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-bold text-blue-800 mb-4">Connectivité & Options</h3>
          <Spec label="Connectivité" value={trottinette.connectivite} />
          <Spec label="Options" value={trottinette.options} />
        </div>

        {/* Usage */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-bold text-blue-800 mb-4">Usage</h3>
          <Spec label="Type de trajet" value={trottinette.type_trajet} />
          <Spec label="Relief" value={trottinette.relief} />
          <Spec label="Type d'utilisation" value={trottinette.type_utilisation} />
        </div>
      </div>
    </div>
  );
};

export default TrottinetteDetail;
