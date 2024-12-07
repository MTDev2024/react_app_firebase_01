import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase"; // Importez Firebase Auth pour vérifier l'état utilisateur

const ProtectedRoute = ({ element: Element }) => {
  // Vérifie si l'utilisateur est connecté
  const user = auth.currentUser;

  return user ? <Element /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
