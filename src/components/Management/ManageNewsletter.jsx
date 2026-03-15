import React, { useEffect, useState, useCallback } from "react";
import { auth, db } from "../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";

const ManageNewsletter = () => {
  const [isAdmin, setIsAdmin] = useState(false); // Vérification de rôle
  const [message, setMessage] = useState("");
  const [subscribers, setSubscribers] = useState([]); // Liste des inscrits
  const [newEmail, setNewEmail] = useState(""); // Ajout ou modification
  const [editing, setEditing] = useState(null); // Email en cours de modification
  const [loading, setLoading] = useState(true);

  const collectionRef = collection(db, "newsletter");

  // Vérification du rôle Administrateur
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

  // Récupérer les inscrits
  const fetchSubscribers = useCallback(async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collectionRef);
      const fetchedSubscribers = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSubscribers(fetchedSubscribers);
    } catch (error) {
      console.error("Erreur lors de la récupération des inscrits :", error);
    } finally {
      setLoading(false);
    }
  }, [collectionRef]);

  // Ajouter un nouvel inscrit
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newEmail || !newEmail.match(/^\S+@\S+\.\S+$/)) {
      return alert("Veuillez saisir une adresse email valide.");
    }

    try {
      await addDoc(collectionRef, { email: newEmail });
      setNewEmail("");
      fetchSubscribers(); // Mettre à jour la liste
    } catch (error) {
      console.error("Erreur lors de l'ajout d'un inscrit :", error);
      alert("Erreur : Impossible d'ajouter l'email.");
    }
  };

  // Modifier un inscrit
  const handleUpdate = async (id) => {
    if (!newEmail || !newEmail.match(/^\S+@\S+\.\S+$/)) {
      return alert("Veuillez saisir une adresse email valide.");
    }

    try {
      const docRef = doc(db, "newsletter", id);
      await updateDoc(docRef, { email: newEmail });
      setEditing(null);
      setNewEmail("");
      fetchSubscribers(); // Mettre à jour la liste
    } catch (error) {
      console.error("Erreur lors de la mise à jour d'un inscrit :", error);
      alert("Erreur : Impossible de mettre à jour l'email.");
    }
  };

  // Supprimer un inscrit
  const handleDelete = async (id) => {
    try {
      const docRef = doc(db, "newsletter", id);
      await deleteDoc(docRef);
      fetchSubscribers(); // Mettre à jour la liste
    } catch (error) {
      console.error("Erreur lors de la suppression d'un inscrit :", error);
      alert("Erreur : Impossible de supprimer l'email.");
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchSubscribers();
    }
  }, [isAdmin, fetchSubscribers]);

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <p className="text-red-500 font-semibold">{message}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return <p>Chargement des inscrits...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white shadow-lg p-6 rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Gestion de la Newsletter</h1>

      {/* Ajouter ou modifier un inscrit */}
      <form
        onSubmit={editing ? (e) => { e.preventDefault(); handleUpdate(editing); } : handleAdd}
        className="mb-4"
      >
        <input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-2"
          placeholder="Saisissez une adresse email"
        />
        <button
          type="submit"
          className={`${
            editing ? "bg-yellow-500" : "bg-blue-600"
          } text-white px-4 py-2 rounded hover:bg-opacity-80`}
        >
          {editing ? "Modifier l'email" : "Ajouter un email"}
        </button>
        {editing && (
          <button
            type="button"
            onClick={() => {
              setEditing(null);
              setNewEmail("");
            }}
            className="ml-2 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Annuler
          </button>
        )}
      </form>

      {/* Liste des inscrits */}
      <ul className="space-y-2">
        {subscribers.map((subscriber) => (
          <li
            key={subscriber.id}
            className="flex justify-between items-center border-b py-2"
          >
            <span>{subscriber.email}</span>
            <div>
              <button
                onClick={() => {
                  setEditing(subscriber.id);
                  setNewEmail(subscriber.email);
                }}
                className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDelete(subscriber.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageNewsletter;
