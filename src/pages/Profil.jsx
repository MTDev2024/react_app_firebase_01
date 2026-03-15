import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase"; // Import centralisé de Firebase
import { doc, getDoc } from "firebase/firestore"; // Firestore pour récupérer les favoris
import { useNavigate } from "react-router-dom";

const Profil = () => {
  const [user, setUser] = useState(null); // État pour l'utilisateur connecté
  const [favorites, setFavorites] = useState([]); // État pour les favoris
  const [loading, setLoading] = useState(true); // État de chargement
  const navigate = useNavigate();

  // Vérifie si un utilisateur est connecté et récupère ses informations
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser); // Définit l'utilisateur
      fetchFavorites(currentUser.uid); // Charge les favoris
    } else {
      navigate("/"); // Redirige si l'utilisateur n'est pas connecté
    }
    setLoading(false); // Arrête l'état de chargement
  }, [navigate]);

  // Fonction pour récupérer les favoris depuis Firestore
  const fetchFavorites = async (userId) => {
    try {
      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        setFavorites(userDoc.data().favoritesTrottinettes || []); // Charge les favoris ou un tableau vide
      } else {
        console.log("Aucun favori trouvé pour cet utilisateur.");
      }
    } catch (err) {
      console.error("Erreur lors de la récupération des favoris :", err);
    }
  };

  // Affichage en cas de chargement
  if (loading) {
    return <p className="text-center text-blue-500 font-bold">Chargement des informations...</p>;
  }

  // Affichage pour les utilisateurs non connectés
  if (!user) {
    return <p className="text-center text-red-500 font-bold">Veuillez vous connecter pour accéder à votre profil.</p>;
  }

  return (
    <div className="max-w-4xl my-10 mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">Mon Profil</h1>

      {/* Informations utilisateur */}
      <div className="flex flex-col items-center mb-8">
        <img
          src="/assets/icons/male_female_users.svg"
          alt="Icone de profil"
          className="h-24 w-24 object-cover shadow-lg rounded-full mb-4"
        />
        <p className="bg-gray-100 text-gray-800 p-3 rounded-md shadow-md">
          <strong>Email :</strong> {user.email}
        </p>
      </div>

      {/* Section des favoris */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-blue-800">Mes Favoris</h2>
        {favorites.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favorites.map((favorite, index) => (
              <li
                key={index}
                className="p-4 bg-gray-50 rounded shadow-md hover:bg-gray-100 transition text-center"
              >
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
