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
    type_trajet: [],
    relief: [],
    poids_max: "",
    guidon: [],
    puissance_moteur: "",
    poids_trottinette: "",
    prix: "",
    urlImage: "",
    freins: [],
    pneus_type: [],
    pneus_taille: "",
    etancheite: [],
    batterie_capacite: "",
    batterie_type: [],
    batterie_charge: "",
    connectivite: [],
    amortisseurs: [],
    type_amortisseurs: [],
    eclairage_ambiant: [],
    verrouillage: "",
    plateforme_dimensions: "",
    plateforme_revetement: [],
    vitesse_max_bridee: "",
    vitesse_max_debridee: "",
    couple_moteur: "",
    pente_max: "",
    type_utilisation: [],
    moteur_position: [],
  });

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        auth.onAuthStateChanged(async (currentUser) => {
          if (currentUser) {
            console.log("Utilisateur connecté :", currentUser.email);
  
            const userRef = doc(db, "users", currentUser.uid);
            const userDoc = await getDoc(userRef);
  
            if (userDoc.exists()) {
              const userData = userDoc.data();
              console.log("Données utilisateur :", userData);
  
              if (userData.role === "Administrateur") {
                console.log("Rôle Administrateur validé.");
                setIsAdmin(true);
              } else {
                console.warn("Utilisateur non autorisé : rôle insuffisant.");
                setMessage("Vous n'avez pas l'autorisation d'accéder à cette page.");
              }
            } else {
              console.error("Document utilisateur introuvable pour UID :", currentUser.uid);
              setMessage("Vos informations d'utilisateur ne sont pas disponibles.");
            }
          } else {
            console.warn("Aucun utilisateur connecté.");
            setMessage("Veuillez vous connecter pour accéder à cette page.");
          }
        });
      } catch (error) {
        console.error("Erreur lors de la vérification du rôle :", error);
        setMessage("Une erreur est survenue lors de la vérification des permissions.");
      }
    };
  
    checkUserRole();
  }, []);
  

  const handleCheckboxChange = (e, category) => {
    const { value, checked } = e.target;
    console.log(`Checkbox ${category}: ${value} - ${checked ? "ajouté" : "supprimé"}`);
    setTrottinetteData((prevState) => ({
      ...prevState,
      [category]: checked
        ? [...prevState[category], value]
        : prevState[category].filter((item) => item !== value),
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Champ modifié : ${name} = ${value}`);
    setTrottinetteData({
      ...trottinetteData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Soumission du formulaire : ", trottinetteData);
    console.log("Données soumises :", trottinetteData); // Log ici pour inspecter les données
    const trottinetteRef = doc(db, "trottinettes", trottinetteData.itemID);
    const existingDoc = await getDoc(trottinetteRef);

    if (existingDoc.exists()) {
      console.warn("ID déjà existant :", trottinetteData.itemID);
      setMessage("Une trottinette avec cet ID existe déjà. Veuillez choisir un autre ID.");
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
        vitesse_max_bridee: parseInt(trottinetteData.vitesse_max_bridee) || 0,
        vitesse_max_debridee: parseInt(trottinetteData.vitesse_max_debridee) || 0,
        couple_moteur: parseInt(trottinetteData.couple_moteur) || 0,
        pente_max: trottinetteData.pente_max,
        type_trajet: trottinetteData.type_trajet,
        relief: trottinetteData.relief,
        guidon: trottinetteData.guidon,
        pneus_type: trottinetteData.pneus_type,
        etancheite: trottinetteData.etancheite,
        batterie_type: trottinetteData.batterie_type,
        connectivite: trottinetteData.connectivite,
        amortisseurs: trottinetteData.amortisseurs,
        type_amortisseurs: trottinetteData.type_amortisseurs,
        plateforme_revetement: trottinetteData.plateforme_revetement,
        moteur_position: trottinetteData.moteur_position,
        type_utilisation: trottinetteData.type_utilisation,
        eclairage_ambiant: trottinetteData.eclairage_ambiant,
        date: new Date(),
      };

      console.log("Données formatées :", formattedData);

      await setDoc(doc(db, "trottinettes", trottinetteData.itemID), formattedData);
      console.log("Trottinette ajoutée avec succès.");
      setMessage("Trottinette ajoutée avec succès !");
      setTrottinetteData({
        itemID: "",
        marque: "",
        modele: "",
        distance_max: "",
        type_trajet: [],
        relief: [],
        poids_max: "",
        guidon: [],
        puissance_moteur: "",
        poids_trottinette: "",
        prix: "",
        urlImage: "",
        freins: [],
        pneus_type: [],
        pneus_taille: "",
        etancheite: [],
        batterie_capacite: "",
        batterie_type: [],
        batterie_charge: "",
        connectivite: [],
        amortisseurs: [],
        type_amortisseurs: [],
        eclairage_ambiant: [],
        verrouillage: "",
        plateforme_dimensions: "",
        plateforme_revetement: [],
        vitesse_max_bridee: "",
        vitesse_max_debridee: "",
        couple_moteur: "",
        pente_max: "",
        type_utilisation: [],
        moteur_position: [],
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
    <div className="w-full mx-48 mt-8 justify-center bg-white shadow-lg p-8 rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Ajouter une Trottinette
      </h1>
      {message && (
        <p
          className={`text-center mb-4 ${
            message.includes("succès") ? "text-green-600" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
      
        {/* Formulaire complet ici */}


       <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 sm:grid gap-6">
  {/* ID, Marque, Modèle */}
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

  {/* Distance Max, Poids Max */}
  <div>
    <label className="block text-gray-700 font-medium">Distance Max (km)</label>
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

  {/* Guidon */}
  <div className="col-span-2">
    <label className="block text-gray-700 font-medium">Guidon</label>
    <div className="flex items-center space-x-4">
      {["réglable", "non réglable", "pliable"].map((option) => (
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

  {/* Puissance Moteur, Poids Trottinette */}
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
  <div>
    <label className="block text-gray-700 font-medium">Poids de la Trottinette (kg)</label>
    <input
      type="number"
      name="poids_trottinette"
      value={trottinetteData.poids_trottinette}
      onChange={handleInputChange}
      className="w-full border rounded px-3 py-2"
      placeholder="Ex : 20"
    />
  </div>



 {/* Nombre de Roues */}
 <div>
          <label className="block text-gray-700 font-medium">Nombre de Roues</label>
          <input
            type="number"
            name="nombre_roues"
            value={trottinetteData.nombre_roues}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Ex : 2, 3, 4"
          />
        </div>

        {/* Nombre de Moteurs */}
        <div>
          <label className="block text-gray-700 font-medium">Nombre de Moteurs</label>
          <input
            type="number"
            name="nombre_moteurs"
            value={trottinetteData.nombre_moteurs}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Ex : 1, 2, 4"
          />
        </div>






  {/* Prix */}
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

  {/* URL de l'image */}
  <div>
    <label className="block text-gray-700 font-medium">Image URL</label>
    <input
      type="text"
      name="urlImage"
      value={trottinetteData.urlImage}
      onChange={handleInputChange}
      className="w-full border rounded px-3 py-2"
      placeholder="Lien vers l'image"
    />
  </div>

  {/* Freins */}
  <div className="col-span-2">
    <label className="block text-gray-700 font-medium">Freins</label>
    <div className="flex items-center space-x-4">
      {["disques av", "disques arr", "tambour av", "tambour arr", "abs", "électromagnétique"].map((option) => (
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
    <label className="block text-gray-700 font-medium">Type de Pneus</label>
    <div className="flex items-center space-x-4">
      {["gonflables", "tubeless", "pleins", "mixtes", "anti-crevaison"].map((option) => (
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
    <label className="block text-gray-700 font-medium">Taille des Pneus</label>
    <input
      type="text"
      name="pneus_taille"
      value={trottinetteData.pneus_taille}
      onChange={handleInputChange}
      className="w-full border rounded px-3 py-2"
      placeholder="Ex : 8 pouces, 10 pouces"
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
