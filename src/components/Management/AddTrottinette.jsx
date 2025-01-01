import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import { collection, setDoc, doc, getDoc } from "firebase/firestore";

const AddTrottinette = () => {
  const [isAdmin, setIsAdmin] = useState(false); // Vérification de rôle
  const [message, setMessage] = useState("");
  const [trottinetteData, setTrottinetteData] = useState({
    itemID: "", // Nouveau champ pour l'ID personnalisé
    marque: "",
    modele: "",
    distance_max: "",
    type_trajet: "",
    relief: "",
    poids_max: "",
    taille_guidon: "",
    puissance_moteur: "",
    poids_trottinette: "",
    prix: "",
    image: "",
  });

  useEffect(() => {
    const checkUserRole = async () => {
      auth.onAuthStateChanged(async (currentUser) => {
        if (currentUser) {
          try {
            const userDoc = await getDoc(doc(db, "users", currentUser.uid));
            if (userDoc.exists() && userDoc.data().role === "Administrateur") {
              setIsAdmin(true);
            } else {
              setMessage("Vous n'avez pas l'autorisation d'accéder à cette page.");
            }
          } catch (error) {
            console.error("Erreur lors de la vérification du rôle :", error);
            setMessage("Erreur lors de la vérification de vos permissions.");
          }
        } else {
          setMessage("Veuillez vous connecter pour accéder à cette page.");
        }
      });
    };

    checkUserRole();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTrottinetteData({
      ...trottinetteData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification si l'ID existe déjà
    const trottinetteRef = doc(db, "trottinettes", trottinetteData.itemID);
    const existingDoc = await getDoc(trottinetteRef);

    if (existingDoc.exists()) {
      setMessage("Une trottinette avec cet ID existe déjà. Veuillez choisir un autre ID.");
      return;
    }

    try {
      const newTrottinette = {
        ...trottinetteData,
        distance_max: parseInt(trottinetteData.distance_max),
        poids_max: parseInt(trottinetteData.poids_max),
        puissance_moteur: parseInt(trottinetteData.puissance_moteur),
        poids_trottinette: parseInt(trottinetteData.poids_trottinette),
        prix: parseInt(trottinetteData.prix),
        type_trajet: trottinetteData.type_trajet.split(",").map((type) => type.trim()),
        relief: trottinetteData.relief.split(",").map((relief) => relief.trim()),
        date: new Date(),
      };

      // Utilisation de setDoc avec un ID personnalisé
      await setDoc(doc(db, "trottinettes", trottinetteData.itemID), newTrottinette);

      setMessage("Trottinette ajoutée avec succès !");
      setTrottinetteData({
        itemID: "",
        marque: "",
        modele: "",
        distance_max: "",
        type_trajet: "",
        relief: "",
        poids_max: "",
        taille_guidon: "",
        puissance_moteur: "",
        poids_trottinette: "",
        prix: "",
        image: "",
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout de la trottinette :", error);
      setMessage("Une erreur est survenue lors de l'ajout de la trottinette.");
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
    <div className="max-w-4xl mx-auto mt-8 bg-white shadow-lg p-6 rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Ajouter une trottinette</h1>
      {message && <p className="text-center text-green-600 mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-gray-700">ID de la trottinette</label>
          <input
            type="text"
            name="itemID"
            value={trottinetteData.itemID}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Ex : DT36V12Ah-011"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700">Marque</label>
          <input
            type="text"
            name="marque"
            value={trottinetteData.marque}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Marque"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700">Modèle</label>
          <input
            type="text"
            name="modele"
            value={trottinetteData.modele}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Modèle"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700">Autonomie (km)</label>
          <input
            type="number"
            name="distance_max"
            value={trottinetteData.distance_max}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Autonomie maximale"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700">Type de trajet</label>
          <input
            type="text"
            name="type_trajet"
            value={trottinetteData.type_trajet}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Ex : route, tout-terrain"
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700">Relief</label>
          <input
            type="text"
            name="relief"
            value={trottinetteData.relief}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Ex : plat, modéré"
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700">Poids maximum (kg)</label>
          <input
            type="number"
            name="poids_max"
            value={trottinetteData.poids_max}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Poids maximal supporté"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700">Guidon</label>
          <input
            type="text"
            name="taille_guidon"
            value={trottinetteData.taille_guidon}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Ex : fixe, réglable"
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700">Puissance du moteur (W)</label>
          <input
            type="number"
            name="puissance_moteur"
            value={trottinetteData.puissance_moteur}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Puissance du moteur"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700">Poids de la trottinette (kg)</label>
          <input
            type="number"
            name="poids_trottinette"
            value={trottinetteData.poids_trottinette}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Poids de la trottinette"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700">Prix (€)</label>
          <input
            type="number"
            name="prix"
            value={trottinetteData.prix}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Prix"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700">Image URL</label>
          <input
            type="text"
            name="image"
            value={trottinetteData.image}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Lien vers l'image"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Ajouter la trottinette
        </button>
      </form>
    </div>
  );
};

export default AddTrottinette;
