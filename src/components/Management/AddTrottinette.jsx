import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const AddTrottinette = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [message, setMessage] = useState("");
  const [trottinetteData, setTrottinetteData] = useState({
    itemID: "",
    marque: "",
    modele: "",
    distance_max: "",
    poids_max: "",
    puissance_moteur: "",
    poids_trottinette: "",
    prix: "",
    pente_max: "",
    pente_unite: "%",
    guidon: [],
    amortisseurs: [],
    freins: [],
    pneus_type: [],
    pneus_taille: "",
    etancheite: [],
    batterie_capacite: "",
    batterie_type: [],
    connectivite: [],
    type_utilisation: [],
    urlImage: "",
  });

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        auth.onAuthStateChanged(async (currentUser) => {
          if (currentUser) {
            const userRef = doc(db, "users", currentUser.uid);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists() && userDoc.data().role === "Administrateur") {
              setIsAdmin(true);
            } else {
              setMessage("Vous n'avez pas l'autorisation d'accéder à cette page.");
            }
          } else {
            setMessage("Veuillez vous connecter pour accéder à cette page.");
          }
        });
      } catch (error) {
        setMessage("Erreur lors de la vérification des permissions.");
      }
    };
    checkUserRole();
  }, []);

  const handleCheckboxChange = (e, category) => {
    const { value, checked } = e.target;
    setTrottinetteData((prevState) => ({
      ...prevState,
      [category]: checked
        ? [...prevState[category], value]
        : prevState[category].filter((item) => item !== value),
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTrottinetteData({
      ...trottinetteData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trottinetteRef = doc(db, "trottinettes", trottinetteData.itemID);
    const existingDoc = await getDoc(trottinetteRef);

    if (existingDoc.exists()) {
      setMessage("Une trottinette avec cet ID existe déjà.");
      return;
    }

    try {
      const formattedData = {
        ...trottinetteData,
        distance_max: parseInt(trottinetteData.distance_max) || 0,
        poids_max: parseInt(trottinetteData.poids_max) || 0,
        puissance_moteur: parseInt(trottinetteData.puissance_moteur) || 0,
        poids_trottinette: parseInt(trottinetteData.poids_trottinette) || 0,
        prix: parseInt(trottinetteData.prix) || 0,
      };

      await setDoc(trottinetteRef, formattedData);
      setMessage("Trottinette ajoutée avec succès !");
      setTrottinetteData({
        itemID: "",
        marque: "",
        modele: "",
        distance_max: "",
        poids_max: "",
        puissance_moteur: "",
        poids_trottinette: "",
        prix: "",
        pente_max: "",
        pente_unite: "%",
        guidon: [],
        amortisseurs: [],
        freins: [],
        pneus_type: [],
        pneus_taille: "",
        etancheite: [],
        batterie_capacite: "",
        batterie_type: [],
        connectivite: [],
        type_utilisation: [],
        urlImage: "",
      });
    } catch (error) {
      setMessage("Erreur lors de l'ajout de la trottinette.");
    }
  };

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <p className="text-red-500 font-semibold">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 bg-white shadow-lg p-8 rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Ajouter une Trottinette
      </h1>
      {message && (
        <p className={`text-center mb-4 ${message.includes("succès") ? "text-green-600" : "text-red-500"}`}>
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Identification */}
        <div>
          <label className="block text-gray-700 font-medium">ID (Unique)</label>
          <input
            type="text"
            name="itemID"
            value={trottinetteData.itemID}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Entrer ID unique"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Marque</label>
          <input
            type="text"
            name="marque"
            value={trottinetteData.marque}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Entrer la marque"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Modèle</label>
          <input
            type="text"
            name="modele"
            value={trottinetteData.modele}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Entrer le modèle"
            required
          />
        </div>

        {/* Performances */}
        <div>
          <label className="block text-gray-700 font-medium">Autonomie (km)</label>
          <input
            type="number"
            name="distance_max"
            value={trottinetteData.distance_max}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Ex : 50"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Poids Max Supporté (kg)</label>
          <input
            type="number"
            name="poids_max"
            value={trottinetteData.poids_max}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Ex : 100"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Puissance Moteur (W)</label>
          <input
            type="number"
            name="puissance_moteur"
            value={trottinetteData.puissance_moteur}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Ex : 500"
          />
        </div>

        {/* Confort */}
        <div className="col-span-2">
          <label className="block text-gray-700 font-medium">Guidon</label>
          <div className="flex items-center space-x-4">
            {["Réglable", "Non réglable", "Pliable"].map((option) => (
              <label key={option} className="inline-flex items-center">
                <input
                  type="checkbox"
                  value={option}
                  onChange={(e) => handleCheckboxChange(e, "guidon")}
                  className="form-checkbox"
                />
                <span className="ml-2">{option}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="col-span-2">
          <label className="block text-gray-700 font-medium">Amortisseurs</label>
          <div className="flex items-center space-x-4">
            {["Avant", "Arrière"].map((option) => (
              <label key={option} className="inline-flex items-center">
                <input
                  type="checkbox"
                  value={option}
                  onChange={(e) => handleCheckboxChange(e, "amortisseurs")}
                  className="form-checkbox"
                />
                <span className="ml-2">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Niveau de pente */}
        <div className="col-span-2">
          <label className="block text-gray-700 font-medium">Niveau de Pente Max</label>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              name="pente_max"
              value={trottinetteData.pente_max}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Ex : 15"
            />
            <select
              name="pente_unite"
              value={trottinetteData.pente_unite}
              onChange={handleInputChange}
              className="border rounded px-3 py-2"
            >
              <option value="%">%</option>
              <option value="°">°</option>
            </select>
          </div>
        </div>

        {/* Freins */}
        <div className="col-span-2">
          <label className="block text-gray-700 font-medium">Freins</label>
          <div className="flex items-center space-x-4">
            {["Disques AV", "Disques AR", "Tambour AV", "Tambour AR", "ABS", "Électromagnétique"].map((option) => (
              <label key={option} className="inline-flex items-center">
                <input
                  type="checkbox"
                  value={option}
                  onChange={(e) => handleCheckboxChange(e, "freins")}
                  className="form-checkbox"
                />
                <span className="ml-2">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Pneus */}
        <div>
          <label className="block text-gray-700 font-medium text-center">Type de Pneus</label>
          <div className="flex items-center space-x-4">
            {["Gonflables", "Tubeless", "Pleins", "Anti-crevaison"].map((option) => (
              <label key={option} className="inline-flex items-center">
                <input
                  type="checkbox"
                  value={option}
                  onChange={(e) => handleCheckboxChange(e, "pneus_type")}
                  className="form-checkbox"
                />
                <span className="ml-2">{option}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-gray-700 font-medium pb-2 text-center">Taille des Pneus</label>
          <input
            type="text"
            name="pneus_taille"
            value={trottinetteData.pneus_taille}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Ex : 10 pouces"
          />
        </div>

        {/* Étanchéité */}
        <div className="col-span-2">
          <label className="block text-gray-700 font-medium">Étanchéité</label>
          <div className="flex items-center space-x-4">
            {["IPX4", "IPX6", "IPX7"].map((option) => (
              <label key={option} className="inline-flex items-center">
                <input
                  type="checkbox"
                  value={option}
                  onChange={(e) => handleCheckboxChange(e, "etancheite")}
                  className="form-checkbox"
                />
                <span className="ml-2">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Batterie */}
        <div>
          <label className="block text-gray-700 font-medium">Capacité Batterie (Ah)</label>
          <input
            type="text"
            name="batterie_capacite"
            value={trottinetteData.batterie_capacite}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Ex : 12"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-gray-700 font-medium">Type de Batterie</label>
          <div className="flex items-center space-x-4">
            {["Li-ion", "NiMH", "Autre"].map((option) => (
              <label key={option} className="inline-flex items-center">
                <input
                  type="checkbox"
                  value={option}
                  onChange={(e) => handleCheckboxChange(e, "batterie_type")}
                  className="form-checkbox"
                />
                <span className="ml-2">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Connectivité */}
        <div className="col-span-2">
          <label className="block text-gray-700 font-medium">Connectivité</label>
          <div className="flex items-center space-x-4">
            {["Bluetooth", "Application mobile", "Port USB", "GPS"].map((option) => (
              <label key={option} className="inline-flex items-center">
                <input
                  type="checkbox"
                  value={option}
                  onChange={(e) => handleCheckboxChange(e, "connectivite")}
                  className="form-checkbox"
                />
                <span className="ml-2">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Type d'utilisation */}
        <div className="col-span-2">
          <label className="block text-gray-700 font-medium">Type d'Utilisation</label>
          <div className="flex items-center space-x-4">
            {["Urbain", "Tout-terrain", "Mixte", "Professionnel"].map((option) => (
              <label key={option} className="inline-flex items-center">
                <input
                  type="checkbox"
                  value={option}
                  onChange={(e) => handleCheckboxChange(e, "type_utilisation")}
                  className="form-checkbox"
                />
                <span className="ml-2">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Image et Prix */}
        <div>
          <label className="block text-gray-700 font-medium">URL de l'Image</label>
          <input
            type="text"
            name="urlImage"
            value={trottinetteData.urlImage}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Lien vers l'image"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Prix (€)</label>
          <input
            type="number"
            name="prix"
            value={trottinetteData.prix}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Ex : 800"
          />
        </div>

        {/* Bouton de soumission */}
        <div className="col-span-2 mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Ajouter la trottinette
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTrottinette;

