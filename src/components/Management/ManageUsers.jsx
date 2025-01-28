import React, { useState, useEffect } from "react";
import { db } from "../../firebase"; // Assurez-vous que le chemin est correct
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const usersCollection = collection(db, "users");
        const snapshot = await getDocs(usersCollection);
        const usersList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
        setMessage("Impossible de charger les utilisateurs.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible."
    );
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "users", userId));
      setUsers(users.filter((user) => user.id !== userId));
      setMessage("Utilisateur supprimé avec succès.");
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
      setMessage("Impossible de supprimer l'utilisateur.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Chargement des utilisateurs...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-8 bg-white shadow-lg p-6 rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Gestion des utilisateurs</h1>
      {message && <p className="text-center text-green-600 mb-4">{message}</p>}
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Rôle</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">{user.role || "Utilisateur"}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
