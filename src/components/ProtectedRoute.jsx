import { Navigate } from "react-router-dom";
import useStore from "../store/store";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  // On lit le store : plus besoin de gérer un state local ni d'appeler Firebase
  const { user, isAdmin, isLoading } = useStore();

  // Firebase n'a pas encore répondu — on attend avant de décider quoi afficher
  // Sans ce garde, l'utilisateur serait redirigé au démarrage même s'il est connecté
  if (isLoading) {
    return <div className="text-center mt-8">Vérification en cours...</div>;
  }

  // Pas connecté → retour à l'accueil
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Route admin mais utilisateur non admin → retour à l'accueil
  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Tout est ok → on affiche la page demandée
  return children;
};

export default ProtectedRoute;
