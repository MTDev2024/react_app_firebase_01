import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { updateProfile } from "firebase/auth";

const Profil = () => {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      setDisplayName(currentUser.displayName || "");
    }
  }, []);

  const handleUpdate = async () => {
    try {
      await updateProfile(auth.currentUser, { displayName });
      alert("Profil mis à jour !");
    } catch (err) {
      alert("Erreur lors de la mise à jour : " + err.message);
    }
  };

  if (!user) {
    return <p className="text-center" >Veuillez vous connecter pour accéder à votre profil.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Mon Profil</h1>
      <div className="mb-6">
        <label className="block font-semibold mb-2">Nom d'utilisateur :</label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="w-full border p-2"
        />
      </div>
      <button className="bg-blue-600 text-white py-2 px-4" onClick={handleUpdate}>
        Mettre à jour
      </button>
    </div>
  );
};

export default Profil;
