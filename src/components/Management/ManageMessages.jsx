import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const ManageMessages = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "messages"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des messages :", error);
        setMessage("Erreur lors de la récupération des messages.");
      }
    };

    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce message ?")) {
      try {
        await deleteDoc(doc(db, "messages", id));
        setMessages(messages.filter((message) => message.id !== id));
        setMessage("Message supprimé avec succès.");
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        setMessage("Erreur lors de la suppression du message.");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">
        Gérer les messages
      </h1>
      {message && <p className="text-center text-green-600 mb-4">{message}</p>}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">Nom</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Message</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg.id}>
                <td className="border px-4 py-2">{msg.name}</td>
                <td className="border px-4 py-2">{msg.email}</td>
                <td className="border px-4 py-2">{msg.message}</td>
                <td className="border px-4 py-2 text-center">
                  <button
                    className="bg-red-600 text-white py-1 px-2 rounded hover:bg-red-700"
                    onClick={() => handleDelete(msg.id)}
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

export default ManageMessages;
