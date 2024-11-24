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
    <div className="max-w-4xl my-10 mx-auto p-6 bg-white shadow-md rounded-lg ">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">Mon Profil</h1>
      
      
      

      {/* Conteneur de profil responsive */}
      <div>
        <img
          src="/assets/icons/male_female_users.svg"
          alt="Icone de profil"
          className="h-24 w-24 object-cover shadow-lg rounded-full"
        />
        <p className="border w- p-3 bg-gray-100 rounded">{user.email}</p>
        
        </div>
          
        
      

      {/* Affichage des favoris */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-800">Mes Favoris</h2>
        {favorites.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {favorites.map((favorite, index) => (
              <li
                key={index}
                className="p-4 bg-gray-50 rounded shadow hover:bg-gray-100 transition"
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
