import { Component } from "react";

/**
 * Error Boundary — filet de sécurité global de l'application.
 *
 * Intercepte toutes les erreurs JavaScript non gérées dans l'arbre de composants
 * enfants et affiche un message propre au lieu d'un écran blanc.
 *
 * Doit obligatoirement être un class component — c'est une contrainte React :
 * les hooks ne peuvent pas intercepter les erreurs de rendu.
 *
 * Utilisation :
 *   <ErrorBoundary>
 *     <MonComposant />
 *   </ErrorBoundary>
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    // hasError : bascule à true dès qu'une erreur est interceptée
    this.state = { hasError: false };
  }

  // Méthode appelée automatiquement par React quand un composant enfant plante.
  // Reçoit l'erreur et doit retourner le nouvel état.
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // Méthode appelée après qu'une erreur a été interceptée.
  // Idéal pour envoyer l'erreur à un service de monitoring (ex: Sentry).
  componentDidCatch(error, info) {
    console.error("Erreur interceptée par ErrorBoundary :", error, info);
  }

  render() {
    if (this.state.hasError) {
      // Message affiché à l'utilisateur en cas d'erreur
      return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Une erreur est survenue
          </h1>
          <p className="text-gray-600 mb-6">
            Quelque chose s'est mal passé. Essayez de recharger la page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Recharger la page
          </button>
        </div>
      );
    }

    // Pas d'erreur → on affiche les composants enfants normalement
    return this.props.children;
  }
}

export default ErrorBoundary;
