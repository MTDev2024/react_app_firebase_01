import React from "react";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase"; // Firebase Auth et Firestore
import { doc, getDoc } from "firebase/firestore";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const [isLoading, setIsLoading] = useState(true); // Indique si la vérification est en cours
  const [isAuthorized, setIsAuthorized] = useState(false); // Autorisation de l'utilisateur

  useEffect(() => {
    const checkAuthorization = async () => {
      const user = auth.currentUser;

      if (!user) {
        setIsAuthorized(false);
        setIsLoading(false);
        return;
      }

      if (adminOnly) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists() && userDoc.data().role === "Administrateur") {
            setIsAuthorized(true);
          } else {
            setIsAuthorized(false);
          }
        } catch (error) {
          console.error("Erreur lors de la vérification du rôle :", error);
          setIsAuthorized(false);
        }
      } else {
        setIsAuthorized(true); // Autoriser tous les utilisateurs connectés si `adminOnly` est faux
      }

      setIsLoading(false);
    };

    checkAuthorization();
  }, [adminOnly]);

  // Affichage pendant le chargement
  if (isLoading) {
    return <div className="text-center mt-8">Vérification en cours...</div>;
  }

  // Redirige si l'utilisateur n'est pas autorisé
  if (!isAuthorized) {
    return <Navigate to="/" replace />;
  }

  return children; // Rendu des enfants si l'utilisateur est autorisé
};

export default ProtectedRoute;
