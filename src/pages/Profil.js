import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore"; // Pour récupérer les favoris
import { useNavigate } from "react-router-dom";

const Profil = () => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]); // État pour les favoris
  const [loading, setLoading] = useState(true); // État pour gérer le chargement
  const navigate = useNavigate();

  // Récupérer l'utilisateur actuellement connecté
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      fetchFavorites(currentUser.uid); // Récupérer les favoris lorsque l'utilisateur est connecté
    } else {
      navigate("/"); // Rediriger vers la page d'accueil si l'utilisateur n'est pas connecté
    }
    setLoading(false);
  }, [navigate]);

  // Fonction pour récupérer les favoris de Firestore
  const fetchFavorites = async (userId) => {
    try {
      const db = getFirestore();
      const docRef = doc(db, "users", userId); // On suppose que les favoris sont dans la collection 'users' document par utilisateur
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setFavorites(docSnap.data().favorites || []);
      } else {
        console.log("Aucun favori trouvé.");
      }
    } catch (err) {
      console.error("Erreur lors de la récupération des favoris :", err);
    }
  };

  // Affichage en fonction de l'état de chargement
  if (loading) {
    return <p className="text-center">Chargement des informations...</p>;
  }

  // Si l'utilisateur n'est pas connecté, afficher un message
  if (!user) {
    return <p className="text-center">Veuillez vous connecter pour accéder à votre profil.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Mon Profil</h1>
      <div className="mb-6 flex items-center gap-4">
        <img
          src="/assets/icons/male_female_users.svg"
          alt="Icone de profil"
          className="h-20 w-20 object-cover shadow-lg rounded-full"
        />
        <div>
          <label className="block font-semibold mb-2">Adresse Email :</label>
          <p className="w-full border p-2 bg-gray-100 rounded">{user.email}</p>
        </div>
      </div>

      {/* Affichage des favoris */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Mes Favoris</h2>
        {favorites.length > 0 ? (
          <ul className="list-disc pl-5 space-y-2">
            {favorites.map((favorite, index) => (
              <li key={index} className="text-gray-700">
                {favorite}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">Vous n'avez pas encore de favoris.</p>
        )}
      </div>
    </div>
  );
};

export default Profil;
