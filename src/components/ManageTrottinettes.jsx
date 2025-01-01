import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Import Firestore
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const ManageTrottinettes = () => {
  const [trottinettes, setTrottinettes] = useState([]); // Liste des trottinettes
  const [message, setMessage] = useState(""); // Message utilisateur
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrottinettes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "trottinettes"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTrottinettes(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des trottinettes :", error);
      }
    };

    fetchTrottinettes();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette trottinette ?")) {
      try {
        await deleteDoc(doc(db, "trottinettes", id));
        setTrottinettes(trottinettes.filter((trottinette) => trottinette.id !== id));
        setMessage("Trottinette supprimée avec succès.");
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        setMessage("Erreur lors de la suppression de la trottinette.");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">
        Gérer les trottinettes
      </h1>
      {message && <p className="text-center text-green-600 mb-4">{message}</p>}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">Marque</th>
              <th className="border px-4 py-2">Modèle</th>
              <th className="border px-4 py-2">Prix</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trottinettes.map((trottinette) => (
              <tr key={trottinette.id}>
                <td className="border px-4 py-2">{trottinette.marque}</td>
                <td className="border px-4 py-2">{trottinette.modele}</td>
                <td className="border px-4 py-2">{trottinette.prix} €</td>
                <td className="border px-4 py-2 text-center">
                  <button
                    className="bg-blue-600 text-white py-1 px-2 rounded hover:bg-blue-700 mr-2"
                    onClick={() => navigate(`/edit-trottinette/${trottinette.id}`)}
                  >
                    Modifier
                  </button>
                  <button
                    className="bg-red-600 text-white py-1 px-2 rounded hover:bg-red-700"
                    onClick={() => handleDelete(trottinette.id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTrottinettes;
